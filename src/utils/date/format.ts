import { format as dfnsFormat } from "date-fns/format";

export function format(date: Date, formatStr: string) {
  return dfnsFormat(date, formatStr);
}