import { useState, useCallback } from "react";

function useToggle(initState = false) {
  const [state, setState] = useState(initState);

  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, toggle, setState] as const;
}

export default useToggle;
