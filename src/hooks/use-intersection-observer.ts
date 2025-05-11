import { useMemo, useRef } from "react";
import useDataRef from "./use-data-ref";

export function useIntersectionObserver(
  callback?: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
  element?: Element
) {
  const dataRef = useDataRef({ callback });

  const previousElement = useRef(null);

  const { root, rootMargin, threshold } = options || {};

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries, observer) => {
          if (dataRef.current.callback) {
            dataRef.current.callback(entries, observer);
          }
        },
        { root, rootMargin, threshold }
      ),
    [dataRef, root, rootMargin, threshold]
  );

  if (element !== previousElement.current) {
    if (previousElement.current) {
      observer.unobserve(previousElement.current);
    }

    if (element) {
      observer.observe(element);
    }

    previousElement.current = element;
  }

  return observer;
}

export default useIntersectionObserver;
