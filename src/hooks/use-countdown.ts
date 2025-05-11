import { countdown } from "utils/date/countdown";
import { useMemo, useSyncExternalStore } from "react";
import useLazyRef from "./use-lazy-ref";

/**
 * @param {any} date
 * @param {{interval: number}} options
 */
function useCountdown(date: number | Date, options: UseCountdownOptions = {}) {
  const { interval = 1000 } = options;

  const snapShotRef = useLazyRef(getCountdown, date);

  const { subscribe, getSnapshot } = useMemo(
    () => ({
      getSnapshot() {
        return snapShotRef.current;
      },
      subscribe(listener: () => void) {
        const intervalId = setInterval(() => {
          snapShotRef.current = getCountdown(date);
          listener();
        }, interval);
        return () => {
          if (intervalId) {
            clearInterval(intervalId);
          }
        };
      },
    }),
    [date, interval, snapShotRef]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export default useCountdown;

function getCountdown(date: number | Date) {
  return countdown(date ? new Date(date) : new Date(), new Date());
}

export type UseCountdownOptions = {
  interval?: number;
};
