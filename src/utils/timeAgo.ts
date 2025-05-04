type Unit =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

const divisions = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

/**
 * Format a date.
 */
export function timeAgo(date: string | number | undefined, locale?: string) {
  if (!date) return "";

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "short",
  });

  let duration = (+new Date(date) - +new Date()) / 1000;

  for (let i = 0; i <= divisions.length; i++) {
    const division = divisions[i];
    if (Math.abs(duration) < division.amount) {
      const timeAgo = formatter.format(
        Math.round(duration),
        division.name as Unit
      );
      return timeAgo;
    }
    duration /= division.amount;
  }

  return "time unknown";
}
