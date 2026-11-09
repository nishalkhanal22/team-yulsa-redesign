/**
 * Team Yulsa — discovery-call booking API (Google Apps Script).
 *
 * SETUP (once):
 *   1. Paste this whole file into Code.gs (replace everything).
 *   2. Services (+) → add "Calendar API" (the advanced service, not CalendarApp).
 *   3. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Put the /exec URL into BRAND.bookingEndpoint in client/src/lib/siteData.ts.
 *
 * The site sends: { name, email, company, service, date, time, timeZone, message }
 * where date is YYYY-MM-DD and time is 24-hour HH:mm in the visitor's IANA zone.
 */

const CALENDAR_ID = "yulsaadvisors@gmail.com";
const BOOKING_DURATION_MINUTES = 30;

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
    const raw = e && e.postData && e.postData.contents;

    if (!raw) {
      throw bookingError_("Empty request body.", "INVALID_REQUEST");
    }

    const data = JSON.parse(raw);
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
  const name = clean_(data.name);
  const email = clean_(data.email);
  const company = clean_(data.company);
  const service = clean_(data.service);
  const message = clean_(data.message).slice(0, 2000);
  const date = clean_(data.date);
  const time = clean_(data.time);
  const timeZone = clean_(data.timeZone);

  const missing = [
    ["name", name],
    ["email", email],
    ["company", company],
    ["service", service],
    ["message", message],
    ["date", date],
    ["time", time],
    ["timeZone", timeZone]
  ].filter(function (pair) {
    return !pair[1];
  });

  if (missing.length > 0) {
    throw bookingError_(
      "Missing required field: " + missing[0][0],
      "INVALID_REQUEST"
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw bookingError_(
      "That email address does not look right.",
      "INVALID_REQUEST"
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    throw bookingError_(
      "Please choose a valid date and time.",
      "INVALID_REQUEST"
    );
  }

  if (!isValidTimeZone_(timeZone)) {
    throw bookingError_(
      "We could not read that timezone. Please pick one from the list.",
      "INVALID_REQUEST"
    );
  }

  // Convert the visitor's wall clock in their zone into one exact instant.
  const startTime = convertToDate(date, time, timeZone);

  // Daylight-saving gaps (for example 2:30 AM on the US spring-forward day) do
  // not exist. Reject them instead of silently booking a different hour.
  if (formatInZone_(startTime, timeZone, "yyyy-MM-dd HH:mm") !== date + " " + time) {
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

    const event = {
      summary: "Team Yulsa Discovery Call — " + name,

      // The visitor is an attendee, so they see this text in the invite email.
      // Show only their own time and zone: the team's time is irrelevant to
      // them, and Google Calendar already renders the event in each viewer's
      // own timezone, so the team still sees the correct Nepal time.
      description:
        "Yulsa Discovery Call\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Company: " + company + "\n" +
        "Service: " + service + "\n" +
        "Message: " + message + "\n\n" +
        "When: " + describeTime_(startTime, timeZone) + "\n" +
        "Time zone: " + timeZone,

      start: {
        dateTime: startTime.toISOString(),
        timeZone: timeZone
      },

      end: {
        dateTime: endTime.toISOString(),
        timeZone: timeZone
      },

      attendees: [
        {
          email: email
        }
      ],

      // 1 hour before by email, 5 minutes before as a popup.
      // Remove this block to use the calendar's default notifications instead.
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
 * Converts a visitor's date/time/timezone into an exact JavaScript Date.
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

function formatInZone_(instant, timeZone, pattern) {
  return Utilities.formatDate(new Date(instant), timeZone, pattern);
}

/** "Monday, November 9, 2026 at 9:00 AM EST" */
function describeTime_(instant, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(instant);
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

function clean_(value) {
  return String(value == null ? "" : value).trim();
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

/**
 * Optional: run this once from the editor to confirm the whole flow works.
 * It books a real event, so delete it afterwards.
 */
function testRealBooking() {
  const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const testData = {
    name: "Yulsa Test Visitor",
    email: "yulsaadvisors@gmail.com",
    company: "Test Company",
    service: "Discovery Call",
    message: "This is a temporary booking-system test.",
    date: Utilities.formatDate(target, "America/New_York", "yyyy-MM-dd"),
    time: "10:00",
    timeZone: "America/New_York"
  };

  const result = createDiscoveryCall(testData);

  Logger.log("Event ID: " + result.eventId);
  Logger.log("Google Meet: " + result.meetLink);
  Logger.log("Start: " + result.start);
  Logger.log("End: " + result.end);
}
