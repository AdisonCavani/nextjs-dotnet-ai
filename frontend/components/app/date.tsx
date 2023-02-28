import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  date: Date;
  withTime?: boolean;
  icon?: ReactNode;
  textCss?: string;
}

function DateComponent({ date, withTime, icon, textCss }: Props) {
  const textColor = getColor(date);
  const dateString = getDateString(date, withTime);

  return (
    <div className={clsx("flex items-center gap-x-1", textColor)}>
      <p className={clsx(textCss, "text-inherit")}>{dateString}</p>
      {icon}
    </div>
  );
}

export default DateComponent;

function getColor(date: Date) {
  const today = Date.now();
  const diff = Math.floor((date.getTime() - today) / (1000 * 60 * 60 * 24)) + 1;

  // In the past
  if (diff < 0) return "text-red-700";
  // Today
  if (diff === 0) return "text-green-700";
  // Tomorrow
  if (diff === 1) return "text-blue-700";
  // This week
  if (diff > 1 && diff <= 7) return "text-purple-700";
  // Other
  return "text-neutral-500";
}

function getDateString(date: Date, withTime?: boolean) {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  const weekendOpt: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  const currYearOpt: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const otherOpt: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const today = Date.now();
  const diff = Math.floor((date.getTime() - today) / (1000 * 60 * 60 * 24)) + 1;

  // Today and tomorrow
  if (diff >= -1 && diff <= 1) {
    const relative = new Intl.RelativeTimeFormat("en-US", {
      localeMatcher: "best fit",
      numeric: "auto",
    }).format(diff, "day");
    const dateString = relative.charAt(0).toUpperCase() + relative.slice(1);

    if (!withTime) return dateString;

    const timeString = date.toLocaleTimeString("en-US", timeOptions);
    return `${dateString} ${timeString}`;
  } else {
    let options = weekendOpt;

    if (diff <= 7 && diff > 1) options = weekendOpt;
    else if (date.getFullYear() === new Date().getFullYear())
      options = currYearOpt;
    else options = otherOpt;

    const dateString = Intl.DateTimeFormat("en-US", options).format(date);

    if (!withTime) return dateString;

    const timeString = date.toLocaleTimeString("en-US", timeOptions);
    return `${dateString} ${timeString}`;
  }
}
