import { DateTime } from "luxon";
import { pluralHandler } from "./text-formatter";

export const formatDateFormatted = (date?: string, format?: string) => {
  if (!date || !format) {
    return "";
  }
  return DateTime.fromISO(date).toFormat(format);
};

export const formatRelativeDateFromNow = (date?: string) => {
  if (!date) {
    return "";
  }

  const { hours, days, months, weeks, years } = DateTime.now().diff(
    DateTime.fromISO(date),
    ["hour", "day", "month", "week", "year"]
  );

  if (years) {
    return `Published at ${Math.floor(years)} year${pluralHandler(years)} ago`;
  }

  if (months) {
    return `Published at ${Math.floor(months)} month${pluralHandler(
      months
    )} ago`;
  }

  if (weeks) {
    return `Published at ${Math.floor(weeks)} week${pluralHandler(weeks)} ago`;
  }

  if (days) {
    return `Published at ${Math.floor(days)} day${pluralHandler(days)} ago`;
  }

  if (hours) {
    return `Published at ${Math.floor(hours)} hour${pluralHandler(hours)} ago`;
  }
};
