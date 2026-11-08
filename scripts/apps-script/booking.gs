/**
 * Team Yulsa — discovery-call booking API (Google Apps Script).
 *
 * Deployed as a Web App (Execute as: me, Who has access: Anyone). The website
 * posts JSON here and reads the JSON response.
 *
 * This is the version that matches the live deployment. If you change it here,
 * paste it into the Apps Script editor and deploy a new version of the same
 * deployment so the endpoint URL stays the same.
 */

const CALENDAR_ID = "yulsaadvisors@gmail.com";
const BOOKING_DURATION_MINUTES = 30;
const TEAM_TIME_ZONE = "Asia/Kathmandu";

/**
 * Simple browser test.
 */
function doGet() {
  return ContentService
    .createTextOutput("Yulsa Discovery Call Booking API is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Receives booking requests from the website.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = createDiscoveryCall(data);

    return jsonResponse({
      success: true,
      message: "Your discovery call has been booked successfully.",
      booking: result
    });
  } catch (error) {
    console.error(error);

    return jsonResponse({
      success: false,
      code: error.code || "BOOKING_FAILED",
      message: error.message
    });
  }
}

/**
 * Creates a real discovery-call booking.
 */
function createDiscoveryCall(data) {
  // Required fields
  const requiredFields = [
    "name",
    "email",
    "company",
    "service",
    "message",
    "date",
    "time",
    "timeZone"
  ];

  requiredFields.forEach(function (field) {
    if (!data[field]) {
      throw bookingError_("Missing required field: " + field, "INVALID_REQUEST");
    }
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email).trim())) {
    throw bookingError_("That email address does not look right.", "INVALID_REQUEST");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !/^\d{2}:\d{2}$/.test(data.time)) {
    throw bookingError_("Please choose a valid date and time.", "INVALID_REQUEST");
  }

  // A bad timezone makes Intl throw a RangeError; catch it early so the visitor
  // gets a readable message instead of "Invalid time zone specified".
  if (!isValidTimeZone_(data.timeZone)) {
    throw bookingError_(
      "We could not read that timezone. Please pick one from the list.",
      "INVALID_REQUEST"
    );
  }

  // Convert the visitor's date/time in their zone into an exact instant.
  const startTime = convertToDate(data.date, data.time, data.timeZone);

  // Daylight-saving gaps (for example 2:30 AM on the US spring-forward day) do
  // not exist. Reject them instead of silently booking a different hour.
  if (
    formatInZone_(startTime, data.timeZone, "yyyy-MM-dd HH:mm") !==
    data.date + " " + data.time
  ) {
    throw bookingError_(
      "That time does not exist on that date because the clocks change. Please pick another time.",
      "INVALID_REQUEST"
    );
  }

  if (startTime.getTime() < Date.now()) {
    throw bookingError_(
      "That time has already passed. Please choose a future date and time.",
      "INVALID_REQUEST"
    );
  }

  const endTime = new Date(
    startTime.getTime() + BOOKING_DURATION_MINUTES * 60 * 1000
  );

  // Two visitors can submit the same slot at the same moment. The lock makes
  // the conflict check and the insert atomic, so only one of them wins.
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(15000)) {
    throw bookingError_(
      "The booking system is busy right now. Please try again in a moment.",
      "BUSY"
    );
  }

  try {
    // Make sure the requested time isn't already booked.
    const conflicts = Calendar.Events.list(CALENDAR_ID, {
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: "startTime"
    });

    const hasConflict = (conflicts.items || []).some(function (event) {
      // Cancelled events and "free" reminders should not block a call.
      return event.status !== "cancelled" && event.transparency !== "transparent";
    });

    if (hasConflict) {
      throw bookingError_(
        "That time is no longer available. Please choose another date or time.",
        "SLOT_TAKEN"
      );
    }

    // Build event details.
    const event = {
      summary: "Team Yulsa Discovery Call — " + data.name,

      description:
        "Yulsa Discovery Call\n\n" +
        "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Company: " + data.company + "\n" +
        "Service: " + data.service + "\n" +
        "Message: " + data.message + "\n\n" +
        "Client time: " +
        formatInZone_(startTime, data.timeZone, "EEEE, MMMM d, yyyy 'at' h:mm a z") +
        "\n" +
        "Kathmandu time: " +
        formatInZone_(startTime, TEAM_TIME_ZONE, "EEEE, MMMM d, yyyy 'at' h:mm a z") +
        "\n" +
        "Visitor time zone: " + data.timeZone,

      start: {
        dateTime: startTime.toISOString(),
        timeZone: data.timeZone
      },

      end: {
        dateTime: endTime.toISOString(),
        timeZone: data.timeZone
      },

      attendees: [
        {
          email: data.email
        }
      ],

      // Explicit reminders: 1 hour before by email, 5 minutes before as a popup.
      // Remove this block to fall back to the calendar's default notifications.
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 5 }
        ]
      },

      conferenceData: {
        createRequest: {
          requestId:
            "yulsa-" +
            new Date().getTime() +
            "-" +
            Math.random().toString(36).substring(2),

          conferenceSolutionKey: {
            type: "hangoutsMeet"
          }
        }
      }
    };

    // Create the calendar event + Google Meet.
    const createdEvent = Calendar.Events.insert(event, CALENDAR_ID, {
      conferenceDataVersion: 1,
      sendUpdates: "all"
    });

    return {
      eventId: createdEvent.id,
      meetLink: findMeetLink_(createdEvent),
      start: startTime.toISOString(),
      end: endTime.toISOString()
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Converts visitor-selected date/time/timezone into a real JavaScript Date.
 *
 * Two passes are required: the first guess can land on the wrong side of a
 * daylight-saving change, so the offset is recalculated at the resulting
 * instant and applied again.
 */
function convertToDate(date, time, timeZone) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const first = guess - zoneOffsetMs_(guess, timeZone);
  const exact = guess - zoneOffsetMs_(first, timeZone);

  return new Date(exact);
}

/**
 * Offset of `timeZone` from UTC at a given instant, in milliseconds.
 */
function zoneOffsetMs_(instantMs, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date(instantMs));

  const values = {};

  parts.forEach(function (part) {
    if (part.type !== "literal") {
      values[part.type] = Number(part.value);
    }
  });

  return (
    Date.UTC(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute,
      values.second
    ) - instantMs
  );
}

function isValidTimeZone_(timeZone) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timeZone });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Formats an instant in a zone using Apps Script's SimpleDateFormat patterns.
 */
function formatInZone_(instant, timeZone, pattern) {
  return Utilities.formatDate(new Date(instant), timeZone, pattern);
}

function findMeetLink_(event) {
  if (event.hangoutLink) return event.hangoutLink;

  if (event.conferenceData && event.conferenceData.entryPoints) {
    const videoEntry = event.conferenceData.entryPoints.find(function (entry) {
      return entry.entryPointType === "video";
    });

    if (videoEntry) return videoEntry.uri;
  }

  return "";
}

function bookingError_(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

/**
 * Returns JSON to the website.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function testRealBooking() {
  const testData = {
    name: "Yulsa Test Visitor",
    email: "yulsaadvisors@gmail.com",
    company: "Test Company",
    service: "Discovery Call",
    message: "This is a temporary booking-system test.",
    date: "2026-09-20",
    time: "10:00",
    timeZone: "America/New_York"
  };

  const result = createDiscoveryCall(testData);

  Logger.log("Event ID: " + result.eventId);
  Logger.log("Google Meet: " + result.meetLink);
  Logger.log("Start: " + result.start);
  Logger.log("End: " + result.end);
}
