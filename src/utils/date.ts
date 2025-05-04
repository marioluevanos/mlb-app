export function formatDate(date: string) {
  const [d, m, y] = formatDateInput(date);
  return new Date(d, m, y).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateInput(date = ""): [number, number, number] {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return [0, 0, 0];

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month) - 1, Number(day)];
}

export function previousDay(date: string): string {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return "";

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month), Number(day) - 1].join("-");
}

export function nextDay(date: string): string {
  const [year, month, end] = date.split("-").map((v) => v);
  if (!year && !month && !end) return "";

  const [day = "0"] = end.split("T") || [];
  return [Number(year), Number(month), Number(day) + 1].join("-");
}
