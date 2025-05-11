import {
  Cell,
  Header,
  HeaderGroup,
  Row,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { ReactNode } from "react";
import clsx from "clsx";
import LoadingContent from "./LoadingIndicator";
import TanStandardTablePagination from "./TanStandardTablePagination";
import ErrorContent from "./ErrorUI";
import EmptyContent from "./EmptyTableUI";
import "./TanStandardTable.css";

function TanStandardTable(props: Partial<TanStandardTableProps>) {
  const resolvedProps = {
    ...props,
    variant: props?.variant ?? "default",
    header: props?.header ?? true,
    footer: props?.footer ?? false,
    pagination: props?.pagination ?? true,
    flexRender: props?.flexRender ?? flexRender,
    slots: { ...props.slots },
    slotProps: { ...props.slotProps },
    slotRenderers: {
      ...props.slotRenderers,
      root: props.slotRenderers?.root ?? renderRoot,
      table: props.slotRenderers?.table ?? renderTable,
      header: props.slotRenderers?.header ?? renderHeader,
      headerRow: props.slotRenderers?.headerRow ?? renderHeaderRow,
      headerCell: props.slotRenderers?.headerCell ?? renderHeaderCell,
      body: props.slotRenderers?.body ?? renderBody,
      bodyRow: props.slotRenderers?.bodyRow ?? renderBodyRow,
      bodyCell: props.slotRenderers?.bodyCell ?? renderBodyCell,
      footer: props.slotRenderers?.footer ?? renderFooter,
      footerRow: props.slotRenderers?.footerRow ?? renderFooterRow,
      footerCell: props.slotRenderers?.footerCell ?? renderFooterCell,
      pagination: props.slotRenderers?.pagination ?? renderPagination,
      loading: props.slotRenderers?.loading ?? renderLoading,
      error: props.slotRenderers?.error ?? renderError,
      empty: props.slotRenderers?.empty ?? renderEmpty,
    },
  };
  return resolvedProps.slotRenderers.root(props.instance, resolvedProps);
}

export default TanStandardTable;

const renderRoot: TanStandardTableProps["slotRenderers"]["root"] =
  function renderRoot(instance, props) {
    const {
      classes,
      loading,
      error,
      empty = !instance.getPaginationRowModel().rows?.length,
      pagination,
      slotRenderers,
    } = props;

    // const isDefault = props.variant === "default";
    // const isAbsolute = props.variant === "absolute";
    // const isRelative = props.variant === "relative";
    const Root = props.slots?.root || "div";
    const RootProps = props.slotProps?.root?.(instance, props);

    return (
      <Root
        {...{
          ...RootProps,
          className: clsx(
            "TanStandardTable",
            RootProps?.className,
            classes?.root
          ),
        }}
      >
        {slotRenderers.table?.(instance, props)}
        {loading
          ? slotRenderers.loading?.(instance, props)
          : error
            ? slotRenderers.error?.(instance, props)
            : empty
              ? slotRenderers.empty?.(instance, props)
              : null}
        {pagination && slotRenderers.pagination?.(instance, props)}
      </Root>
    );
  };

const renderTable: TanStandardTableProps["slotRenderers"]["table"] =
  function renderTable(instance, props) {
    const {
      classes,
      header,
      footer,
      loading,
      error,
      empty = !instance.getPaginationRowModel().rows?.length,
      slotRenderers,
    } = props;

    const isDefault = props.variant === "default";
    const Table = props.slots?.table || (isDefault ? "table" : "div");

    const TableProps = props.slotProps?.table?.(instance, props);

    return (
      <Table
        {...{
          ...TableProps,
          className: clsx(
            "TanStandardTable__table",
            TableProps?.className,
            classes?.table
          ),
          style: {
            width: instance.getTotalSize(),
            ...TableProps?.style,
          },
        }}
      >
        {TableProps?.children || (
          <>
            {header && slotRenderers.header?.(instance, props)}
            {!(loading || error || empty) && (
              <>
                {slotRenderers.body?.(instance, props)}
                {footer && slotRenderers.footer?.(instance, props)}
              </>
            )}
          </>
        )}
      </Table>
    );
  };

const renderHeader: TanStandardTableProps["slotRenderers"]["header"] =
  function renderHeader(instance, props) {
    const isDefault = props.variant === "default";
    // const isAbsolute = props.variant === "absolute";
    // const isRelative = props.variant === "relative";
    const Header = props.slots?.header || (isDefault ? "thead" : "div");
    const HeaderProps = props.slotProps?.header?.(instance, props);

    return (
      <Header
        {...{
          ...HeaderProps,
          className: clsx(
            "TanStandardTable__table__header",
            HeaderProps?.className,
            props.classes?.header
          ),
        }}
      >
        {HeaderProps?.children ||
          instance
            .getHeaderGroups()
            .map((headerRow) =>
              props.slotRenderers.headerRow(headerRow, instance, props)
            )}
      </Header>
    );
  };

const renderHeaderRow: TanStandardTableProps["slotRenderers"]["headerRow"] =
  function renderHeaderRow(headerRow, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const HeaderRow = props.slots?.headerRow || (isDefault ? "tr" : "div");
    const HeaderRowProps = props.slotProps?.headerRow?.(
      headerRow,
      instance,
      props
    );

    return (
      <HeaderRow
        {...{
          key: headerRow.id,
          ...HeaderRowProps,
          className: clsx(
            "TanStandardTable__table__header__row",
            props.classes?.headerRow,
            HeaderRowProps?.className,
            isRelative && "TanStandardTable__table__header__row--relative",
            isAbsolute && "TanStandardTable__table__header__row--absolute"
          ),
        }}
      >
        {HeaderRowProps?.children ||
          headerRow.headers.map((headerCell) =>
            props.slotRenderers.headerCell(headerCell, instance, props)
          )}
      </HeaderRow>
    );
  };

const renderHeaderCell: TanStandardTableProps["slotRenderers"]["headerCell"] =
  function renderHeaderCell(headerCell, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const HeaderCell = props.slots?.headerCell || (isDefault ? "th" : "div");
    const HeaderCellProps = props.slotProps?.headerCell?.(
      headerCell,
      instance,
      props
    );

    return (
      <HeaderCell
        {...{
          key: headerCell.id,
          colSpan: headerCell.colSpan,
          ...HeaderCellProps,
          className: clsx(
            "TanStandardTable__table__header__row__cell",
            props.classes?.headerCell,
            HeaderCellProps?.className,
            isRelative &&
            "TanStandardTable__table__header__row__cell--relative",
            isAbsolute && "TanStandardTable__table__header__row__cell--absolute"
          ),
          style: {
            width: headerCell.getSize(),
            ...(isAbsolute ? { left: headerCell.getStart() } : {}),
            ...HeaderCellProps?.style,
          },
        }}
      >
        {HeaderCellProps?.children || (
          <>
            {headerCell.isPlaceholder
              ? null
              : props.flexRender(
                headerCell.column.columnDef.header,
                headerCell.getContext()
              )}
            <div
              {...{
                onMouseDown: headerCell.getResizeHandler(),
                onTouchStart: headerCell.getResizeHandler(),
                className: `TanStandardTable__resizer ${headerCell.column.getIsResizing()
                  ? "TanStandardTable__resizing"
                  : ""
                  }`,
                style: {
                  transform:
                    instance.options.columnResizeMode === "onEnd" &&
                      headerCell.column.getIsResizing()
                      ? `translateX(${instance.getState().columnSizingInfo.deltaOffset
                      }px)`
                      : "",
                },
              }}
            />
          </>
        )}
      </HeaderCell>
    );
  };

const renderBody: TanStandardTableProps["slotRenderers"]["body"] =
  function renderBody(instance, props) {
    const isDefault = props.variant === "default";
    // const isAbsolute = props.variant === "absolute";
    // const isRelative = props.variant === "relative";
    const Body = props.slots?.body || (isDefault ? "tbody" : "div");
    const BodyProps = props.slotProps?.body?.(instance, props);

    return (
      <Body
        {...{
          ...BodyProps,
          className: clsx(
            "TanStandardTable__table__body",
            BodyProps?.className,
            props.classes?.body
          ),
        }}
      >
        {BodyProps?.children ||
          instance
            .getPaginationRowModel()
            .rows.map((bodyRow) =>
              props.slotRenderers.bodyRow?.(bodyRow, instance, props)
            )}
      </Body>
    );
  };

const renderBodyRow: TanStandardTableProps["slotRenderers"]["bodyRow"] =
  function renderBodyRow(bodyRow, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const BodyRow = props.slots?.bodyRow || (isDefault ? "tr" : "div");
    const BodyRowProps = props.slotProps?.bodyRow?.(bodyRow, instance, props);

    return (
      <BodyRow
        {...{
          key: bodyRow.id,
          ...BodyRowProps,
          className: clsx(
            "TanStandardTable__table__body__row w-full",
            BodyRowProps?.className,
            props.classes?.bodyRow,
            isRelative && "TanStandardTable__table__body__row--relative",
            isAbsolute && "TanStandardTable__table__body__row--absolute"
          ),
        }}
      >
        {BodyRowProps?.children ||
          bodyRow
            .getVisibleCells()
            .map((bodyCell) =>
              props.slotRenderers.bodyCell(bodyCell, instance, props)
            )}
      </BodyRow>
    );
  };

const renderBodyCell: TanStandardTableProps["slotRenderers"]["bodyCell"] =
  function renderBodyCell(bodyCell, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const Cell = props.slots?.bodyCell || (isDefault ? "td" : "div");
    const BodyCellProps = props.slotProps?.bodyCell?.(
      bodyCell,
      instance,
      props
    );

    return (
      <Cell
        {...{
          key: bodyCell.id,
          ...BodyCellProps,
          style: {
            width: bodyCell.column.getSize(),
            ...(isAbsolute ? { left: bodyCell.column.getStart() } : {}),
            ...BodyCellProps?.style,
          },
          className: clsx(
            "TanStandardTable__table__body__row__cell",
            BodyCellProps?.className,
            props.classes?.bodyCell,
            isRelative && "TanStandardTable__table__body__row__cell--relative",
            isAbsolute && "TanStandardTable__table__body__row__cell--absolute"
          ),
        }}
      >
        {BodyCellProps?.children ||
          props.flexRender(
            bodyCell.column.columnDef.cell,
            bodyCell.getContext()
          )}
      </Cell>
    );
  };

const renderFooter: TanStandardTableProps["slotRenderers"]["footer"] =
  function renderFooter(instance, props) {
    const isDefault = props.variant === "default";
    // const isAbsolute = props.variant === "absolute";
    // const isRelative = props.variant === "relative";
    const Footer = props.slots?.footer || (isDefault ? "tfoot" : "div");
    const FooterProps = props.slotProps?.footer?.(instance, props);

    return (
      <Footer
        {...{
          ...FooterProps,
          className: clsx(
            "TanStandardTable__table__footer",
            FooterProps?.className,
            props.classes?.footer
          ),
        }}
      >
        {FooterProps?.children ||
          instance
            .getFooterGroups()
            .map((footerRow) =>
              props.slotRenderers.footerRow(footerRow, instance, props)
            )}
      </Footer>
    );
  };

const renderFooterRow: TanStandardTableProps["slotRenderers"]["footerRow"] =
  function renderFooterRow(footerRow, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const FooterRow = props?.slots.footerRow || (isDefault ? "tr" : "div");
    const FooterRowProps = props.slotProps?.footerRow?.(
      footerRow,
      instance,
      props
    );

    return (
      <FooterRow
        {...{
          key: footerRow.id,
          ...FooterRowProps,
          className: clsx(
            "TanStandardTable__table__footer__row",
            FooterRowProps?.className,
            props.classes?.footerRow,
            isRelative && "TanStandardTable__table__footer__row--relative",
            isAbsolute && "TanStandardTable__table__footer__row--absolute"
          ),
        }}
      >
        {FooterRowProps?.children ||
          footerRow.headers.map((footerCell) =>
            props.slotRenderers.footerCell(footerCell, instance, props)
          )}
      </FooterRow>
    );
  };

const renderFooterCell: TanStandardTableProps["slotRenderers"]["footerCell"] =
  function renderFooterCell(footerCell, instance, props) {
    const isDefault = props.variant === "default";
    const isAbsolute = props.variant === "absolute";
    const isRelative = props.variant === "relative";
    const FooterCell = props.slots?.footerCell || (isDefault ? "th" : "div");
    const FooterCellProps = props?.slotProps?.footerCell?.(
      footerCell,
      instance,
      props
    );

    return (
      <FooterCell
        {...{
          key: footerCell.id,
          colSpan: footerCell.colSpan,
          ...FooterCellProps,
          className: clsx(
            "TanStandardTable__table__footer__row__cell",
            FooterCellProps?.className,
            props.classes?.footerCell,
            isRelative &&
            "TanStandardTable__table__footer__row__cell--relative",
            isAbsolute && "TanStandardTable__table__footer__row__cell--absolute"
          ),
          style: {
            width: footerCell.getSize(),
            ...(isAbsolute ? { left: footerCell.getStart() } : {}),
            ...FooterCellProps?.style,
          },
        }}
      >
        {FooterCellProps?.children || (
          <>
            {footerCell.isPlaceholder
              ? null
              : props.flexRender(
                footerCell.column.columnDef.footer,
                footerCell.getContext()
              )}
          </>
        )}
      </FooterCell>
    );
  };

const renderPagination: TanStandardTableProps["slotRenderers"]["pagination"] =
  function renderPagination(instance, props) {
    const Pagination = props.slots?.pagination || "div";
    const PaginationProps = props.slotProps?.pagination?.(instance, props);

    return (
      <Pagination
        {...{
          ...PaginationProps,
          className: clsx(
            "TanStandardTable__pagination",
            PaginationProps?.className,
            props.classes?.pagination
          ),
        }}
      >
        {PaginationProps?.children || (
          <TanStandardTablePagination instance={instance} />
        )}
      </Pagination>
    );
  };

const renderLoading: TanStandardTableProps["slotRenderers"]["loading"] =
  function renderLoading(instance, props) {
    const Loading = props.slots?.loading || "div";
    const LoadingProps = props.slotProps?.loading?.(instance, props);

    return (
      <Loading
        {...{
          ...LoadingProps,
          className: clsx(
            "TanStandardTable__loading",
            LoadingProps?.className,
            props.classes?.loading
          ),
        }}
      >
        {LoadingProps?.children || <LoadingContent />}
      </Loading>
    );
  };

const renderError: TanStandardTableProps["slotRenderers"]["error"] =
  function renderError(instance, props) {
    const Error = props.slots?.error || "div";
    const ErrorProps = props.slotProps?.error?.(instance, props);

    return (
      <Error
        {...{
          ...ErrorProps,
          className: clsx(
            "TanStandardTable__error",
            ErrorProps?.className,
            props.classes?.error
          ),
        }}
      >
        {ErrorProps?.children || (
          <ErrorContent onTryAgain={props.onErrorRetry} />
        )}
      </Error>
    );
  };

const renderEmpty: TanStandardTableProps["slotRenderers"]["empty"] =
  function renderEmpty(instance, props) {
    const Empty = props.slots?.empty || "div";
    const EmptyProps = props.slotProps?.empty?.(instance, props);

    return (
      <Empty
        {...{
          ...EmptyProps,
          className: clsx(
            "TanStandardTable__empty",
            EmptyProps?.className,
            props.classes?.empty
          ),
        }}
      >
        {EmptyProps?.children || <EmptyContent className='w-[424px] text-center' />}
      </Empty>
    );
  };

export type TanStandardTableProps = {
  type?: "standard";
  variant?: "default" | "absolute" | "relative";
  instance?: Table<any>;
  flexRender?: (...args: any[]) => any;
  classes?: TanStandardTableClasses;
  slots?: TanStandardTableSlots;
  slotProps?: TanStandardTableSlotProps;
  slotRenderers?: TanStandardTableSlotRenderers;
  header?: boolean;
  footer?: boolean;
  pagination?: boolean;
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
  onErrorRetry?: () => void;
  onEmptyRetry?: () => void;
};

export type TanStandardTableSlots = {
  root?: any;
  table?: any;
  header?: any;
  headerRow?: any;
  headerCell?: any;
  body?: any;
  bodyRow?: any;
  bodyCell?: any;
  footer?: any;
  footerRow?: any;
  footerCell?: any;
  pagination?: any;
  loading?: any;
  error?: any;
  empty?: any;
};

export type TanStandardTableSlotProps = {
  root?: (instance: Table<any>, props: TanStandardTableProps) => any;
  table?: (instance: Table<any>, props: TanStandardTableProps) => any;
  header?: (instance: Table<any>, props: TanStandardTableProps) => any;
  headerRow?: (
    headerRow: HeaderGroup<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  headerCell?: (
    headerCell: Header<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  body?: (instance: Table<any>, props: TanStandardTableProps) => any;
  bodyRow?: (
    bodyRow: Row<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  bodyCell?: (
    bodyCell: Cell<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  footer?: (instance: Table<any>, props: TanStandardTableProps) => any;
  footerRow?: (
    footerRow: HeaderGroup<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  footerCell?: (
    footerCell: Header<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => any;
  pagination?: (instance: Table<any>, props: TanStandardTableProps) => any;
  loading?: (instance: Table<any>, props: TanStandardTableProps) => any;
  error?: (instance: Table<any>, props: TanStandardTableProps) => any;
  empty?: (instance: Table<any>, props: TanStandardTableProps) => any;
};

export type TanStandardTableSlotRenderers = {
  root: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  table: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  header: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  headerRow: (
    headerRow: HeaderGroup<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  headerCell: (
    headerCell: Header<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  body: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  bodyRow: (
    bodyRow: Row<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  bodyCell: (
    bodyCell: Cell<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  footer: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  footerRow: (
    footerRow: HeaderGroup<any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  footerCell: (
    footerCell: Header<any, any>,
    instance: Table<any>,
    props: TanStandardTableProps
  ) => ReactNode;
  pagination: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  loading: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  error: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
  empty: (instance: Table<any>, props: TanStandardTableProps) => ReactNode;
};
export type TanStandardTableClasses = {
  [P in keyof TanStandardTableSlots]?: string;
};