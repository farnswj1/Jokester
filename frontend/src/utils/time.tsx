import { DateTime } from 'luxon';

export const parseISOToLocale = (timestamp: string) => (
  DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED)
);
