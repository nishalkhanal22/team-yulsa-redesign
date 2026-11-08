/**
 * Team Yulsa — discovery-call booking API (Google Apps Script).
 *
 * Deployed as a Web App (Execute as: me, Who has access: Anyone). The site
 * posts JSON here and reads the JSON response, so the visitor gets the real
 * Meet link and confirmed time instead of a blind "request sent" message.
 *
 * SETUP (one time, in the Apps Script editor):
 *   1. Paste this file over Code.gs.
 *   2. Services (+) → add "Calendar API" (the advanced service). It is used to
 *      create the Google Meet conference, which CalendarApp cannot do.
 *   3. Set CONFIG below: calendarId, ownerEmail, and (optionally) a log sheet.
 *   4. Deploy → Manage deployments → edit the existing deployment → Version:
 *      "New version" → Deploy. Keeping the same deployment ID keeps the site's
 *      endpoint URL unchanged.
 *
 * WHY THE CONVERSION MATTERS
 *   The form sends a wall-clock date/time plus the visitor's IANA timezone.
 *   `Utilities.parseDate` turns that pair into one exact instant, so a 10:00 AM
 *   New York booking is stored as 15:00Z and shows up as 8:45 PM in Kathmandu.
 *   Nothing is inferred from the server's own timezone.
 */

var CONFIG = {
  // "primary" uses the account's main calendar. Use a calendar ID (the
  // ...@group.calendar.google.com address) to keep bookings separate.
  calendarId: "primary",

  // The window the site offers slots in. Must match BOOKING in
  // client/src/lib/booking.ts (America/New_York, Mon–Fri 9:00–17:00).
  businessTimeZone: "America/New_York",
  businessStartHour: 9,
  businessEndHour: 17,
  slotMinutes: 30,

  // Shown in the event and the confirmation email.
  teamTimeZone: "Asia/Kathmandu",
  teamCity: "Kathmandu",
  teamName: "Team Yulsa",

  // Replies and booking notifications go here.
  ownerEmail: "info@teamyulsa.com",

  // Optional: append every confirmed booking to a spreadsheet.
  logSpreadsheetId: "",
  logSheetName: "Bookings",

  // Reject requests for a slot this close to now (minutes).
  minimumLeadMinutes: 60,
};

var MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ------------------------------------------------------------------ routes */

function doGet(e) {
  var params = (e && e.parameter) || {};

  if (params.action === "availability") {
    return json_(availability_(params.from, params.to));
  }

  return ContentService.createTextOutput(
    "Yulsa Discovery Call Booking API is running."
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var payload = {};
  try {
    payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (error) {
    return json_({ success: false, code: "BAD_REQUEST", message: "Invalid request body." });
  }

  try {
    return json_(book_(payload));
  } catch (error) {
    console.error(error);
    return json_({
      success: false,
      code: "SERVER_ERROR",
      message: "Something went wrong on our side. Please email " + CONFIG.ownerEmail + ".",
    });
  }
}

/* ------------------------------------------------------------ availability */

function availability_(fromIso, toIso) {
  var from = parseIso_(fromIso);
  var to = parseIso_(toIso);

  if (!from || !to || to.getTime() <= from.getTime()) {
    return { success: false, message: "Invalid availability range." };
  }
  // Guard against someone asking for years of history.
  if (to.getTime() - from.getTime() > 90 * 24 * 60 * 60 * 1000) {
    return { success: false, message: "Availability range is too wide." };
  }

  var events = calendar_().getEvents(from, to);
  var busy = [];

  for (var i = 0; i < events.length; i += 1) {
    var event = events[i];
    // "Free" events (reminders, holds marked transparent) do not block a call.
    if (event.getTransparency && event.getTransparency() === CalendarApp.EventTransparency.TRANSPARENT) {
      continue;
    }
    busy.push({
      start: event.getStartTime().toISOString(),
      end: event.getEndTime().toISOString(),
      allDay: event.isAllDayEvent(),
    });
  }

  return { success: true, busy: busy, generatedAt: new Date().toISOString() };
}

/* ---------------------------------------------------------------- booking */

function book_(data) {
  var name = clean_(data.name);
  var email = clean_(data.email);
  var company = clean_(data.company) || "Not provided";
  var service = clean_(data.service) || "General discovery call";
  var message = clean_(data.message) || "No additional message provided.";
  var timeZone = clean_(data.timeZone) || CONFIG.businessTimeZone;
  var date = clean_(data.date);
  var time = clean_(data.time);

  if (!name || name.length < 2) {
    return fail_("Please tell us your name.");
  }
  if (!isEmail_(email)) {
    return fail_("That email address does not look right.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return fail_("Please choose a date and time.");
  }
  if (!isTimeZone_(timeZone)) {
    return fail_("We could not read that timezone. Please pick one from the list.");
  }

  // The exact instant, derived from the visitor's wall clock + their zone.
  var start;
  try {
    start = Utilities.parseDate(date + " " + time, timeZone, "yyyy-MM-dd HH:mm");
  } catch (error) {
    return fail_("That date and time could not be read.");
  }

  // Reject rolled-over dates such as 2026-02-30.
  if (Utilities.formatDate(start, timeZone, "yyyy-MM-dd HH:mm") !== date + " " + time) {
    return fail_("That date and time does not exist.");
  }

  var end = new Date(start.getTime() + CONFIG.slotMinutes * 60 * 1000);

  // Server-side slot rules, mirroring the picker.
  var ruleError = validateSlot_(start);
  if (ruleError) return fail_(ruleError);

  // Conflict check: any overlapping event means the slot is gone.
  var conflicts = calendar_().getEvents(
    new Date(start.getTime() - 1000),
    new Date(end.getTime() + 1000)
  );
  for (var i = 0; i < conflicts.length; i += 1) {
    if (
      conflicts[i].getTransparency &&
      conflicts[i].getTransparency() === CalendarApp.EventTransparency.TRANSPARENT
    ) {
      continue;
    }
    return {
      success: false,
      code: "SLOT_TAKEN",
      message: "That time was just taken. Please pick another slot.",
    };
  }

  var visitorTime = describe_(start, timeZone);
  var teamTime = describe_(start, CONFIG.teamTimeZone);
  var title = "Team Yulsa discovery call — " + name + (company !== "Not provided" ? " (" + company + ")" : "");

  var description = [
    "30-minute discovery call with " + CONFIG.teamName + ".",
    "",
    "Visitor: " + name,
    "Email: " + email,
    "Company: " + company,
    "Interested in: " + service,
    "",
    "Time: " + visitorTime,
    "Team time (" + CONFIG.teamCity + "): " + teamTime,
    "",
    "Notes:",
    message,
  ].join("\n");

  var created = insertEvent_(title, description, start, end, email);
  if (!created) {
    return fail_("We could not create the calendar event. Please email " + CONFIG.ownerEmail + ".");
  }

  sendEmails_(created, name, email, company, service, message, visitorTime, teamTime);
  logBooking_(created, name, email, company, service, start, timeZone);

  return {
    success: true,
    message: "Your discovery call is confirmed.",
    booking: {
      eventId: created.id,
      meetLink: created.meetLink || "",
      start: start.toISOString(),
      end: end.toISOString(),
      visitorTime: visitorTime,
      teamTime: teamTime,
      timeZone: timeZone,
    },
  };
}

function validateSlot_(start) {
  if (start.getTime() < Date.now() + CONFIG.minimumLeadMinutes * 60 * 1000) {
    return "That time has already passed. Please pick a later slot.";
  }

  var weekday = Number(Utilities.formatDate(start, CONFIG.businessTimeZone, "u")); // 1 = Monday
  if (weekday > 5) {
    return "We take calls Monday to Friday. Please pick a weekday.";
  }

  var hour = Number(Utilities.formatDate(start, CONFIG.businessTimeZone, "HH"));
  var minute = Number(Utilities.formatDate(start, CONFIG.businessTimeZone, "mm"));
  var minutes = hour * 60 + minute;

  if (
    minutes < CONFIG.businessStartHour * 60 ||
    minutes + CONFIG.slotMinutes > CONFIG.businessEndHour * 60
  ) {
    return "That time is outside our call window. Please pick another slot.";
  }

  if (minute % CONFIG.slotMinutes !== 0) {
    return "Please pick one of the listed times.";
  }

  return "";
}

/* --------------------------------------------------------------- calendar */

function calendar_() {
  if (!CONFIG.calendarId || CONFIG.calendarId === "primary") {
    return CalendarApp.getDefaultCalendar();
  }
  var calendar = CalendarApp.getCalendarById(CONFIG.calendarId);
  return calendar || CalendarApp.getDefaultCalendar();
}

/**
 * Creates the event with a Google Meet conference.
 * Requires the advanced "Calendar API" service to be enabled.
 */
function insertEvent_(title, description, start, end, guestEmail) {
  var requestId = "yulsa-" + start.getTime() + "-" + Math.random().toString(36).slice(2, 10);

  var resource = {
    summary: title,
    description: description,
    start: { dateTime: start.toISOString(), timeZone: "UTC" },
    end: { dateTime: end.toISOString(), timeZone: "UTC" },
    attendees: [{ email: guestEmail }],
    guestsCanModify: false,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 15 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: requestId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    var event = Calendar.Events.insert(resource, CONFIG.calendarId || "primary", {
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    var meetLink = event.hangoutLink || "";
    if (!meetLink && event.conferenceData && event.conferenceData.entryPoints) {
      for (var i = 0; i < event.conferenceData.entryPoints.length; i += 1) {
        if (event.conferenceData.entryPoints[i].entryPointType === "video") {
          meetLink = event.conferenceData.entryPoints[i].uri;
          break;
        }
      }
    }

    return { id: event.id, meetLink: meetLink, htmlLink: event.htmlLink || "" };
  } catch (error) {
    console.error("Calendar insert failed", error);
    // Fallback: still book the slot, just without a Meet link.
    try {
      var fallback = calendar_().createEvent(title, start, end, {
        description: description,
        guests: guestEmail,
        sendInvites: true,
      });
      return { id: fallback.getId(), meetLink: "", htmlLink: "" };
    } catch (innerError) {
      console.error("Fallback insert failed", innerError);
      return null;
    }
  }
}

/* ------------------------------------------------------------------ email */

function sendEmails_(booking, name, email, company, service, message, visitorTime, teamTime) {
  var subject = "Confirmed: Team Yulsa discovery call — " + visitorTime;

  var lines = [
    "Hi " + name.split(" ")[0] + ",",
    "",
    "Your 30-minute discovery call with " + CONFIG.teamName + " is confirmed.",
    "",
    "Your time: " + visitorTime,
    "Our time (" + CONFIG.teamCity + "): " + teamTime,
    "",
    booking.meetLink ? "Google Meet: " + booking.meetLink : "We will send the meeting link shortly.",
    booking.htmlLink ? "Calendar event: " + booking.htmlLink : "",
    "",
    "What we will cover:",
    "  • Your current bookkeeping and software setup",
    "  • Where the month-end time is going",
    "  • A fixed monthly scope and price for your business",
    "",
    "Reply to this email if you need to move the call.",
    "",
    CONFIG.teamName,
    CONFIG.ownerEmail,
  ].filter(Boolean);

  var body = lines.join("\n");

  // Confirmation to the visitor.
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
    name: CONFIG.teamName,
    replyTo: CONFIG.ownerEmail,
  });

  // Internal notification.
  MailApp.sendEmail({
    to: CONFIG.ownerEmail,
    subject: "New discovery call — " + name + " (" + company + ")",
    body: [
      "New booking confirmed.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Company: " + company,
      "Interested in: " + service,
      "",
      "Their time: " + visitorTime,
      "Kathmandu time: " + teamTime,
      "",
      "Message:",
      message,
      "",
      booking.meetLink ? "Meet: " + booking.meetLink : "",
    ].join("\n"),
    name: CONFIG.teamName,
  });
}

/* ------------------------------------------------------------------- log */

function logBooking_(booking, name, email, company, service, start, timeZone) {
  if (!CONFIG.logSpreadsheetId) return;
  try {
    var sheet = SpreadsheetApp.openById(CONFIG.logSpreadsheetId).getSheetByName(CONFIG.logSheetName);
    if (!sheet) {
      sheet = SpreadsheetApp.openById(CONFIG.logSpreadsheetId).insertSheet(CONFIG.logSheetName);
      sheet.appendRow([
        "Timestamp", "Name", "Email", "Company", "Service",
        "Start (UTC)", "Visitor timezone", "Kathmandu time", "Meet link",
      ]);
    }
    sheet.appendRow([
      new Date(),
      name,
      email,
      company,
      service,
      start.toISOString(),
      timeZone,
      describe_(start, CONFIG.teamTimeZone),
      booking.meetLink || "",
    ]);
  } catch (error) {
    console.error("Booking log failed", error);
  }
}

/* ---------------------------------------------------------------- helpers */

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function fail_(message) {
  return { success: false, code: "VALIDATION", message: message };
}

function clean_(value) {
  return String(value == null ? "" : value).trim().slice(0, 2000);
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isTimeZone_(timeZone) {
  try {
    Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd");
    return true;
  } catch (error) {
    return false;
  }
}

function parseIso_(value) {
  if (!value) return null;
  var date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

/** "Monday, December 15, 2026 at 10:00 AM EST" in the given zone. */
function describe_(instant, timeZone) {
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
    Number(Utilities.formatDate(instant, timeZone, "u")) % 7
  ];
  var month = MONTHS[Number(Utilities.formatDate(instant, timeZone, "M")) - 1];
  var day = Utilities.formatDate(instant, timeZone, "d");
  var year = Utilities.formatDate(instant, timeZone, "yyyy");
  var clock = Utilities.formatDate(instant, timeZone, "h:mm a");
  var zone = Utilities.formatDate(instant, timeZone, "z");

  return weekday + ", " + month + " " + Number(day) + ", " + year + " at " + clock + " " + zone;
}
