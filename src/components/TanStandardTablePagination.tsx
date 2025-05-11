import { Icon, IconButton } from "@mui/material";
import clsx from "clsx";
import "./TanStandardTablePagination.css";

/**
 *
 * @param {TanStandardTablePaginationProps} props
 */
function TanStandardTablePagination(props:any) {
  const { instance, className, classes, ...restProps } = props;

  return (
    <div
      className={clsx("TanStandardTablePagination", className, classes?.root)}
      {...restProps}
    >
      <span className={clsx("TanStandardTablePagination__info", classes?.info)}>
        {instance.getState().pagination?.pageSize *
          instance.getState().pagination?.pageIndex +
          1}{" "}
        -{" "}
        {instance.getState().pagination?.pageSize *
          (instance.getState().pagination?.pageIndex + 1)}{" "}
        of{" "}
        {instance.options.manualPagination && instance.options?.pageCount > 0
          ? instance.options?.pageCount *
              instance.getState().pagination.pageSize -
            (instance.getState().pagination.pageSize -
              instance.getPrePaginationRowModel().rows.length)
          : instance.getPrePaginationRowModel().rows.length}
      </span>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => instance.setPageIndex(0)}
        disabled={!instance.getCanPreviousPage()}
      >
        <Icon>first_page</Icon>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => instance.previousPage()}
        disabled={!instance.getCanPreviousPage()}
      >
        <Icon>navigate_before</Icon>
      </IconButton>
      <div className={clsx("TanStandardTablePagination__page", classes?.page)}>
        <h5
          className={clsx(
            "TanStandardTablePagination__pageText",
            classes?.pageText
          )}
        >
          {instance.getState()?.pagination?.pageIndex + 1}
        </h5>
      </div>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => instance.nextPage()}
        disabled={!instance.getCanNextPage()}
      >
        <Icon>navigate_next</Icon>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
        disabled={!instance.getCanNextPage()}
      >
        <Icon>last_page</Icon>
      </IconButton>
    </div>
  );
}

export default TanStandardTablePagination;

/**
 * @typedef {{
 * instance: import('@tanstack/react-table').Table<any>
 * classes?: {root: string; info: string; page: string; pageText: string}
 * } & import("react").ComponentPropsWithRef<'div'>} TanStandardTablePaginationProps
 */
