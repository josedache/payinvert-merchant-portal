import { ComponentPropsWithoutRef, useEffect } from "react";
import "./LoadingContent.css";
import ErrorContent from "./ErrorContent";
import LoadingIndicator from "./LoadingIndicator";
import useDataRef from "hooks/use-data-ref";
import { cn } from "utils/cn";

function LoadingContent(props: LoadingContentProps) {
  const {
    fullHeight,
    centered,
    onMount,
    Component = "div",
    loading,
    renderLoading = renderLoadingDefault,
    error,
    renderError = renderErrorDefault,
    blocking,
    renderBlocking = renderBlockingDefault,
    children,
    className,
    ...restProps
  } = props;
  const dataRef = useDataRef({ onMount });

  useEffect(() => {
    dataRef.current.onMount?.();
  }, [dataRef]);

  if (!loading && !error) {
    return typeof children === "function" ? children() : children;
  }

  return (
    <Component
      className={cn(
        "LoadingContent",
        className,
        fullHeight && "LoadingContent--fullHeight",
        centered && "LoadingContent--centered"
      )}
      {...restProps}
    >
      {blocking ? renderBlocking?.(props) : null}
      {error ? renderError?.(props) : renderLoading?.(props)}
    </Component>
  );
}

export default LoadingContent;

function CustomLoading(props) {
  return (
    <div {...props}>
      <LoadingIndicator />
    </div>
  );
}

/**
 *
 * @param {LoadingContentProps} props
 */
function renderLoadingDefault(props) {
  const Loading = props.Loading ?? CustomLoading;
  return (
    <Loading
      {...props.LoadingProps}
      className={cn("LoadingContent-loading", props.LoadingProps?.className)}
    />
  );
}

function CustomError(props) {
  return <ErrorContent {...props} />;
}

/**
 *
 * @param {LoadingContentProps} props
 */
function renderErrorDefault(props) {
  const ErrorComponent = props.Error ?? CustomError;

  return (
    <ErrorComponent
      onRetry={props.onRetry}
      {...props.ErrorProps}
      className={cn("LoadingContent-error", props.ErrorProps?.className)}
    />
  );
}

/**
 *
 * @param {LoadingContentProps} props
 */
function renderBlockingDefault(props) {
  const Blocking = props.Blocking ?? "div";
  return (
    <Blocking
      {...props.BlockingProps}
      className={cn("LoadingContent-blocking", props.BlockingProps?.className)}
    />
  );
}

export type LoadingContentProps = {
  fullHeight?: boolean;
  centered?: boolean;
  Component?: any;
  children: any | (() => any);
  onMount?: () => void;
  loading?: boolean;
  LoadingProps?: any;
  renderLoading?: (props: LoadingContentProps) => any;
  error?: boolean;
  Error?: any;
  ErrorProps?: any;
  renderError?: (props: LoadingContentProps) => any;
  errorTitle?: any;
  errorDescription?: any;
  onRetry?: any;
  onCancel?: () => void;
  cancelText?: () => void;
  blocking?: boolean;
  Blocking?: any;
  BlockingProps?: any;
  renderBlocking?: (props: LoadingContentProps) => any;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;
