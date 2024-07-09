import moment, { Moment } from "moment";

import { DateISO } from "@/models/date";

export const formatDateCustom = (
  value: moment.MomentInput,
  options?: { format?: string; empty?: string }
) => {
  return value
    ? moment(value).format(options?.format || "HH:mm - DD/MM/YYYY")
    : options?.empty || "";
};

export class DateUtils {
  static ISOFormat = "YYYY-MM-DDTHH:mm:ss[.000Z]";
  static DMYFormat = "DD MMM yyyy";

  static formatDate = (ISOString: string, format?: string) => {
    return moment(ISOString).format(format || this.DMYFormat);
  };

  static startOfISODay(date?: Date | DateISO | Moment | string): string {
    return moment(date).startOf("day").format(this.ISOFormat);
  }
  static endOfISODay(date?: Date | DateISO | Moment | string): string {
    return moment(date).endOf("day").format(this.ISOFormat);
  }

  static decreaseWhenWeekends(date: Moment) {
    if (date.day() === 6) return date.subtract(1, "day");
    if (date.day() === 0) return date.subtract(2, "day");
    return date;
  }
  static increaseWhenWeekends(date: Moment) {
    if (date.day() === 6) return date.add(2, "day");
    if (date.day() === 0) return date.add(1, "day");
    return date;
  }
  static isInWorkdayRange(
    parentStartDate: Moment,
    parentEndDate: Moment,
    childStartDate: Moment,
    childEndDate: Moment
  ): boolean {
    if (!parentStartDate || !parentEndDate || !childStartDate || !childEndDate) return false;
    const newStartDate = this.increaseWhenWeekends(parentStartDate);
    const newEndDate = this.decreaseWhenWeekends(parentEndDate);
    return (
      childStartDate.isSameOrAfter(newStartDate, "date") &&
      childEndDate.isSameOrBefore(newEndDate, "date")
    );
  }
  static isDateInRange = (date: Moment, startDate: string, endDate: string) => {
    if (!date || !startDate || !endDate) return false;
    const currentDate = date.toDate().toISOString();
    return (
      moment(currentDate).isSameOrAfter(moment(startDate), "date") &&
      moment(currentDate).isSameOrBefore(moment(endDate), "date")
    );
  };
  static countWorkingDayOf = (date: Moment, unit: "week" | "month" | "year" = "month") => {
    const startDate = moment(date).startOf(unit);
    const endDate = moment(date).endOf(unit);

    let count = 0;
    const currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, "day")) {
      // Check if the current day is a weekend (Saturday or Sunday)
      const dayOfWeek = currentDate.day();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Consider adding additional checks for holidays here if needed
        count++;
      }
      currentDate.add(1, "day");
    }
    return count;
  };
  static subtractWeekdays(date: Moment, days: number) {
    let count = 0;
    while (count < days) {
      date.subtract(1, "day");
      if (date.day() !== 0 && date.day() !== 6) {
        // Check if the day is not a weekend day
        count++;
      }
    }
    return date;
  }
  static addWeekdays(date: Moment, days: number) {
    let count = 0;
    while (count < days) {
      date.add(1, "day");
      if (date.day() !== 0 && date.day() !== 6) {
        // Check if the day is not a weekend day
        count++;
      }
    }
    return date;
  }

  static isWeekend = (date: Moment) => {
    const dayOfWeek = moment(date).day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  static diffBusinessDays = (startDate: string, endDate: string) => {
    let start = moment(startDate);
    let end = moment(endDate);
    let diff = end.diff(start, "days");

    // Check if the start date is after the end date and swap if needed
    if (diff < 0) {
      [start, end] = [end, start];
      diff = Math.abs(diff);
    }

    let businessDays = 0;
    const currentDate = start;

    while (currentDate.isBefore(end)) {
      if (!this.isWeekend(currentDate)) {
        businessDays++;
      }
      currentDate.add(1, "days");
    }

    return businessDays;
  };
}
