import {
  Breadcrumbs,
  BreadcrumbsProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { Link } from "react-router-dom";
import { cn } from "utils/cn";

function PageBreadcrumbs(props: PageBreadcrumbsProps) {
  const {
    breadcrumbs = [],
    separator = <span className="text-text-secondary">&gt;</span>,
    className,
    ...restProps
  } = props;

  return (
    <Breadcrumbs
      separator={separator}
      className={cn("text-text-primary", className)}
      {...restProps}
    >
      {breadcrumbs.map(({ to, label, children, ...restProp }, index) => {
        const isLink = index !== breadcrumbs?.length - 1;
        return (
          <Typography
            {...{
              key: index,
              variant: "h6",
              ...(isLink ? { component: Link, to } : {}),
              ...restProp,
            }}
          >
            {children || label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

export default PageBreadcrumbs;

export type PageBreadcrumbsProps = {
  breadcrumbs: ({ label: string; to?: string } & TypographyProps)[];
} & BreadcrumbsProps;
