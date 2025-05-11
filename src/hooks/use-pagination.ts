import { PAGE_INDEX, PAGE_SIZE } from "constants/pagination";
import { useCallback, useState } from "react";

function usePagination(options?: PaginationOptions) {
  const [state, setState] = useState(() => ({
    pageSize: options?.pageSize ?? PAGE_SIZE,
    pageIndex: options?.pageIndex ?? PAGE_INDEX,
  }));

  const paramsState = {
    offset: state.pageSize * state.pageIndex,
    limit: state.pageSize,
  };

  const setParamState = useCallback(({ offset, limit }: typeof paramsState) => {
    setState({ pageIndex: offset / limit, pageSize: limit });
  }, []);

  return [state, setState, paramsState, setParamState] as const;
}

export default usePagination;

export type PaginationOptions = { pageIndex?: number; pageSize?: number };
