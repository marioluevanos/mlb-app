/**
 * Legible dates for the UI.
 */
export function toLegibleDate(date: string) {
  const [d, m, y] = formatDateInput(date);
  return new Date(d, m - 1, y).toLocaleDateString(undefined, {
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
  return [Number(year), Number(month), Number(day)];
}

/**
 * Get the local time, and not the UTC
 * https://stackoverflow.com/questions/18554360/toisostring-return-wrong-date
 */
export function getLocalDate(d: string | number = "") {
  const date = !d ? new Date() : new Date(d);
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  return localISOTime.split("T")[0];
}

type DayInfo = {
  /**
   * ISO date string
   */
  date: Date;
  /**
   * A legible date e.g., "Mon, Apr 29"
   */
  label: string;
};

export class DateNavigator {
  private currentDate: Date;

  constructor(initialDate = getLocalDate()) {
    this.currentDate = new Date(initialDate);
  }

  setCurrentDay(date: Date) {
    this.currentDate = date;
  }

  goForwardOneDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
  }

  goBackOneDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
  }

  getSurroundingDays(): DayInfo[] {
    const days: DayInfo[] = [];

    for (let offset = -3; offset <= 3; offset++) {
      const tempDate = new Date(this.currentDate);
      tempDate.setDate(this.currentDate.getDate() + offset);

      days.push({
        date: tempDate,
        label: this.formatDate(tempDate),
      });
    }

    return days;
  }

  private formatDate(date: Date): string {
    const weekday = date.toLocaleDateString(undefined, { weekday: "short" }); // e.g., "Mon"
    const month = date.toLocaleDateString(undefined, { month: "short" }); // e.g., "Apr"
    const day = date.getDate(); // e.g., 29
    return `${weekday}, ${month} ${day}`;
  }

  getCurrentDate(): Date {
    return new Date(this.currentDate);
  }
}
