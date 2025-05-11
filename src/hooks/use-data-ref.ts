import { useRef } from "react";

function useDataRef<T>(data: T) {
  const ref = useRef(data);
  ref.current = data;
  return ref;
}

export default useDataRef;
