import { debounce } from "utils/function/debounce";
import { useEffect, useMemo, useState } from "react";

interface Options {
  wait?: number;
  enableReInitialize?: boolean;
}

function useDebouncedState<T>(initialState?: T, options: Options = {}) {
  const { wait = 100, enableReInitialize = false } = options;
  const [debouncedState, setDebouncedState] = useState<T | undefined>(
    initialState
  );
  const [state, setState] = useState(debouncedState);

  const debouncedSetState = useMemo(() => {
    const db = debounce(setDebouncedState, wait);
    return ((arg) => {
      setState(arg);
      return db(arg);
    }) as typeof setDebouncedState;
  }, [wait]);

  useEffect(() => {
    if (enableReInitialize) {
      debouncedSetState(initialState);
    }
  }, [debouncedSetState, enableReInitialize, initialState]);

  return [debouncedState, debouncedSetState, state] as [
    T,
    typeof debouncedSetState,
    T,
  ];
}

export default useDebouncedState;
