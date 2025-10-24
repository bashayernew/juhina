// coach-kw/src/lib/ics.ts
export function buildICS({
  title,
  description,
  startISO,
  endISO,
  organizerEmail,
}: {
  title: string;
  description: string;
  startISO: string; // UTC ISO string
  endISO: string;   // UTC ISO string
  organizerEmail: string;
}) {
  const uid = `${Date.now()}@booking`;
  const toCal = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Juhainah//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toCal(new Date().toISOString())}`,
    `DTSTART:${toCal(startISO)}`,
    `DTEND:${toCal(endISO)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER:mailto:${organizerEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function buildICS({
  title,
  description,
  startISO,
  endISO,
  organizerEmail,
}: {
  title: string;
  description: string;
  startISO: string;
  endISO: string;
  organizerEmail: string | undefined;
}) {
  const uid = `${Date.now()}@booking`;
  const toCal = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Juhainah//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toCal(new Date().toISOString())}`,
    `DTSTART:${toCal(startISO)}`,
    `DTEND:${toCal(endISO)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER:mailto:${organizerEmail ?? ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}


