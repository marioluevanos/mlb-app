/**
 * Legible dates for the UI.
 */
export function formatDate(date: string) {
  const [d, m, y] = formatDateInput(date);
  return new Date(d, m, y).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get date in a `[yyyy, mm, dd]` number format
 */
export function formatDateInput(date = ""): [number, number, number] {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return [0, 0, 0];

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month) - 1, Number(day)];
}

/**
 * Get the local time, and not the UTC
 * https://stackoverflow.com/questions/18554360/toisostring-return-wrong-date
 */
export function getLocalDate(d = "") {
  const date = !d ? new Date() : new Date(d);
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  return localISOTime;
}
