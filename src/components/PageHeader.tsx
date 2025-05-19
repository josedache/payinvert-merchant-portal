import {
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "./PageHeader.css";
import { Icon } from "@iconify/react/dist/iconify.js";

/**
 *
 * @param {PageHeaderProps} props
 */
function PageHeader(props: PageHeaderProps) {
  const {
    title,
    className,
    breadcrumbs,
    children,
    classes,
    beforeTitle,
    ...rest
  } = props;
  return (
    <div>
      <div className={clsx("PageHeader", className, classes?.root)} {...rest}>
        {beforeTitle}
        <Typography
          variant="h5"
          className={clsx("PageHeader__title", classes?.title)}
        >
          {title}
        </Typography>
        <div className={clsx("PageHeader__content", classes?.rootContent)}>
          {children}
        </div>
        <div className="flex-1" />
        {!!breadcrumbs.length && (
          <Breadcrumbs
            separator={
              <Icon
                icon="iconamoon:arrow-right-2-light"
                width="20"
                height="20"
              />
            }
          >
            {breadcrumbs.map((breadcrumb: any, key: number) => {
              const isPage = key === breadcrumbs.length - 1;

              if (isPage) {
                return (
                  <Typography
                    className="text-[#0A0A0A] font-semibold"
                    key={key}
                  >
                    {breadcrumb.name}
                  </Typography>
                );
              }

              return (
                <MuiLink
                  underline="hover"
                  key={key}
                  color="inherit"
                  component={Link}
                  className="text-[#616161] font-medium"
                  to={breadcrumb.to || "#"}
                >
                  {breadcrumb.name}
                </MuiLink>
              );
            })}
          </Breadcrumbs>
        )}
      </div>
      {!!children && (
        <Toolbar
          disableGutters
          className={clsx("PageHeader-content", classes?.content)}
        >
          {children}
        </Toolbar>
      )}
    </div>
  );
}

PageHeader.defaultProps = {
  breadcrumbs: [],
  classes: {},
};

export default PageHeader;

type PageHeaderProps = {
  breadcrumbs: { name: string; to: string }[];
  classes: {
    root: string;
    title: string;
    content: string;
    rootContent: string;
  };
  beforeTitle?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
