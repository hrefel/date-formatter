// separator issue, need refactor
export interface IOptions {
  locale?: 'id-ID' | 'en-GB';
  separator?: string;
}

export type DateFormatOptions =
  | 'ISO'
  | 'ISO_WITH_TIMEZONE'
  | 'DD MM YYYY'
  | 'YYYY MM DD'
  | 'DD MMM YYYY'
  | 'MMM YYYY'
  | 'YYYY DD MM'
  | 'DD MM YYYY HH:mm'
  | 'DD MM YYYY hh:mm A'
  | 'FULL_DATE'
  | 'FULL_DATE_TIME_24'
  | 'FULL_DATE_TIME_12'
  | 'FULL_DATE_WITH_TZ';

export const FORMAT_OPTIONS: Record<
  DateFormatOptions,
  Intl.DateTimeFormatOptions
> = {
  ISO: {},
  ISO_WITH_TIMEZONE: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  },
  'DD MM YYYY': { day: '2-digit', month: '2-digit', year: 'numeric' },
  'YYYY MM DD': { year: 'numeric', month: '2-digit', day: '2-digit' },
  'DD MMM YYYY': { day: '2-digit', month: 'short', year: 'numeric' },
  'MMM YYYY': { month: 'short', year: 'numeric' },
  'YYYY DD MM': { year: 'numeric', day: '2-digit', month: '2-digit' },
  'DD MM YYYY HH:mm': {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  'DD MM YYYY hh:mm A': {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
  FULL_DATE: {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  },
  FULL_DATE_TIME_24: {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  FULL_DATE_TIME_12: {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
  FULL_DATE_WITH_TZ: {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  },
};

export function format(
  date: Date | number,
  formatType: DateFormatOptions = 'ISO',
  options: IOptions = {}
): string {
  if (typeof date === 'number') date = new Date(date);
  if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid Date';

  const { separator, locale = 'id-ID' } = options;

  if (!(formatType in FORMAT_OPTIONS))
    throw new Error(`Invalid Format: ${formatType}`);

  if (formatType === 'ISO') return date.toISOString().split('T')[0];

  if (formatType === 'ISO_WITH_TIMEZONE') {
    return new Intl.DateTimeFormat(locale, {
      ...FORMAT_OPTIONS.ISO_WITH_TIMEZONE,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  }

  const formatOptions = FORMAT_OPTIONS[formatType];
  let formattedDate = new Intl.DateTimeFormat(locale, formatOptions)
    .format(date)
    .trim();

  // Hanya ubah separator jika format numerik
  if (/^\d/.test(formattedDate)) {
    return formattedDate.replace(/[\s/]+/g, separator);
  }

  return formattedDate;
}
