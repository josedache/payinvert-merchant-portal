import { addSeconds as dfnsAddSeconds } from "date-fns/addSeconds";

export function addSeconds(date: Date, amount: number) {
  return dfnsAddSeconds(date, amount);
}
