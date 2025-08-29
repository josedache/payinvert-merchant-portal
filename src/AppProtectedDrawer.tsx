import { useMemo } from "react";
import {
  Avatar,
  Badge,
  Collapse,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import clsx from "clsx";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";

import useSideNavigation from "hooks/use-side-navigation";
import MediaBreakpoint from "enums/media-breakpoint";
import Logo from "components/Logo";
import useToggle from "hooks/use-toggle";
import usePopover from "hooks/use-popover";
import * as urlsConstant from "constants/urls";
import useSidebarIcon from "hooks/use-sidebar-icon";

import * as CustomIcon from "assets/icons";
import useAuthUser from "hooks/use-auth-user";

function AppProtectedDrawer() {
  const isLg = useMediaQuery(MediaBreakpoint.LG);

  const infoPopover = usePopover();
  const authUser = useAuthUser();

  const sideNavigation = useSideNavigation();
  const sidebarIcon = useSidebarIcon();

  const isActiveClient = authUser?.businessDetails?.active ?? false;

  const NAV_LINKS = useMemo(
    () => [
      {
        key: "main",
        links: [
          {
            label: "Home",
            to: urlsConstant.DASHBOARD,
            kycAllow: true,
            links: [
              {
                icon: "ic:twotone-dashboard",
                label: "Overview",
                to: urlsConstant.DASHBOARD,
                kycAllow: true,
              },
              ...(!isActiveClient
                ? [
                    {
                      icon: <CustomIcon.Compliance />,
                      label: "Compliance",
                      to: urlsConstant.COMPLIANCE_UPDATE,
                      kycAllow: true,
                    },
                  ]
                : []),
            ],
          },
          {
            label: "Business",
            to: urlsConstant.BUSINESS,
            kycAllow: true,
            links: [
              {
                icon: <CustomIcon.Transactions />,
                label: "Transactions",
                to: urlsConstant.TRANSACTION,
                kycAllow: isActiveClient,
              },
              // {
              //   icon: <CustomIcon.Invoices />,
              //   label: "Invoices",
              //   to: urlsConstant.INVOICE,
              //   kycAllow: true,
              // },
              {
                icon: <CustomIcon.Customers />,
                label: "Customers",
                to: urlsConstant.CUSTOMER,
                kycAllow: isActiveClient,
              },
              {
                icon: <CustomIcon.PaymentLinks />,
                label: "Payment Links",
                to: urlsConstant.PAYMENT_LINK,
                kycAllow: isActiveClient,
              },
            ],
          },
          {
            label: "Account",
            to: urlsConstant.ACCOUNT,
            kycAllow: true,
            links: [
              {
                icon: <CustomIcon.VirtualWallets />,
                label: "Collection Accounts",
                to: urlsConstant.COLLECTION_ACCOUNT,
                kycAllow: isActiveClient,
              },
              // {
              //   icon: <CustomIcon.Settlements />,
              //   label: "Settlements",
              //   to: urlsConstant.SETTLEMENTS,
              //   kycAllow: isActiveClient,
              // },
              // {
              //   icon: <CustomIcon.PayoutAccount />,
              //   label: "Payouts",
              //   to: urlsConstant.ACCOUNT_PAYOUTS,
              //   kycAllow: false,
              // },
              {
                icon: <CustomIcon.Wallet />,
                label: "Wallet",
                to: urlsConstant.WALLET,
                kycAllow: isActiveClient,
              },
            ],
          },
          {
            label: "Settings",
            to: urlsConstant.SETTINGS,
            kycAllow: true,
            links: [
              // {
              //   icon: <CustomIcon.Profile />,
              //   label: "Business",
              //   to: urlsConstant.SETTINGS_BUSINESS,
              //   kycAllow: isActiveClient,
              // },
              {
                icon: <CustomIcon.Compliance />,
                label: "Compliance Information",
                to: urlsConstant.COMPLIANCE,
                kycAllow: true,
              },
              {
                icon: <CustomIcon.PayoutAccount />,
                label: "Payout Accounts",
                to: urlsConstant.PAYOUT_SETTING,
                kycAllow: isActiveClient,
              },
              {
                icon: <CustomIcon.RolesPermissions />,
                label: "Roles & Permissions",
                to: urlsConstant.ROLES_AND_PERMISSION,
                kycAllow: isActiveClient,
              },
              // {
              //   icon: <CustomIcon.UserSubsidiaries />,
              //   label: "Users",
              //   to: urlsConstant.USER,
              //   kycAllow: isActiveClient,
              // },
              {
                icon: <CustomIcon.Preferences />,
                label: "Preferences",
                to: urlsConstant.PREFERENCE,
                kycAllow: isActiveClient,
              },
              {
                icon: <CustomIcon.ApiWebhooks />,
                label: "API Keys & Webhooks",
                to: urlsConstant.API_WEBHOOKS,
                kycAllow: isActiveClient,
              },
              {
                icon: <CustomIcon.HelpAndSupport />,
                label: "Help & Support",
                to: urlsConstant.SUPPORT,
                kycAllow: true,
              },
            ],
          },
        ],
      },
    ],
    [isActiveClient]
  );

  const collapseToIcon = isLg && !sidebarIcon.isOpen;

  return (
    <div className="relative">
      <Drawer
        open={sideNavigation.isOpen}
        variant={isLg ? "permanent" : "temporary"}
        anchor={isLg ? "left" : "right"}
        slotProps={{
          paper: {
            className: clsx(
              collapseToIcon ? "w-[80px]" : "w-[270px]",
              "flex flex-col border-0 pl-4 pr-4 md:pr-0 bg-background-default text-primary-contrastText transition-all bg-white"
              // isLg ? "" : "bg-none"
            ),
          },
        }}
        onClose={() => sideNavigation.toggle()}
      >
        <Toolbar className="flex items-center px-0 pt-4  justify-between ">
          {isLg && (
            <Paper
              elevation={0}
              className="py-4 px-3 w-full flex justify-center"
            >
              <Logo className="w-full h-full max-w-[150px]" variant="2" />
              {/*<Logo width={48} height={48} className="" variant="1" />*/}
            </Paper>
          )}

          {!isLg && (
            <div className="flex gap-4">
              <Avatar src="" className="w-[40px] h-[40px]" />
              <Popover
                open={infoPopover.isOpen}
                anchorEl={infoPopover.anchorEl}
                onClose={infoPopover.togglePopover}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                className="p-2"
              ></Popover>
              <div className=" border rounded-full w-10 h-10 border-neutral-100 ">
                <IconButton>
                  <Badge variant="dot" color="error">
                    <Iconify
                      className="MuiIcon-root"
                      icon="pajamas:notifications"
                    />
                  </Badge>
                </IconButton>
              </div>
            </div>
          )}

          {!isLg && (
            <IconButton onClick={() => sideNavigation.toggle()}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          )}
        </Toolbar>

        <List
          disablePadding
          className="flex-1 min-h-0 gap-6 overflow-y-auto scrollbar-hidden mt-4"
        >
          {NAV_LINKS.map(({ links, key }) => {
            return (
              <div key={key}>
                {links.map((item) => {
                  return (
                    <AppProtectedDrawerItem
                      key={item.label}
                      collapseToIcon={collapseToIcon}
                      item={item}
                    />
                  );
                })}
              </div>
            );
          })}
        </List>

        <footer className="text-[#424242] py-5">
          <Typography>
            Copyright © {new Date().getFullYear()} All rights reserved
          </Typography>
          <Typography>All rights reserved</Typography>
        </footer>
      </Drawer>
    </div>
  );
}

export default AppProtectedDrawer;

function AppProtectedDrawerItem(props: any) {
  const item = props.item;

  const { kycAllow, label, to, links, onClick } = item;

  const isKycCompleted = false;

  const isGroup = !!links;

  const location = useLocation();

  const match = useMemo(() => {
    let result = null;
    const _links = isGroup ? links : [item];
    for (const link of _links) {
      result = matchPath({ path: link.to + "/*" }, location.pathname);
      if (result) {
        if (link?.toMatchExclude?.includes(result?.pathname)) {
          result = null;
        }
        break;
      }
    }
    return result;
  }, [isGroup, links, location.pathname, item]);

  const [isSubMenu, toggleSubMenu] = useToggle();

  return (
    <Paper
      // elevation={!!match || !isSubMenu ? 0 : 1}
      elevation={0}
      className={clsx(
        "mb-6 p-0 mt-0 overflow-hidden"
        // !!match || isSubMenu ? "bg-white" : "bg-transparent"
      )}
    >
      <ListItemButton
        disableRipple
        disableTouchRipple
        disableGutters
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        className={clsx(
          "flex px-4 gap-2 py-3 ",
          !!match && !isGroup
            ? "bg-[#EDFAF1] text-primary-contrastText"
            : "bg-transparent"
        )}
        {...(isGroup
          ? { onClick: toggleSubMenu }
          : isKycCompleted || kycAllow
            ? onClick
              ? { onClick }
              : { component: Link, to }
            : { disabled: true })}
      >
        <Typography
          className={clsx(
            isGroup ? "font-bold uppercase" : "",
            "text-[#616161] flex-1"
          )}
        >
          {label}
        </Typography>
        {isGroup && (
          <Iconify
            className="text-2xl"
            width={18}
            height={18}
            icon={isSubMenu ? "mingcute:up-line" : "mingcute:down-line"}
          />
        )}
      </ListItemButton>

      {isGroup && (
        <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {links?.map(({ label, icon, to, toMatchExclude, ...rest }) => (
              <ListItemButton
                disableRipple
                key={label}
                selected={
                  match?.pathnameBase === to &&
                  !toMatchExclude?.includes(match?.pathname)
                }
                className={clsx(
                  "px-4 font-bold rounded-none py-3",
                  match?.pathnameBase === to &&
                    !toMatchExclude?.includes(match?.pathname) &&
                    "bg-primary-lighter text-primary-main"
                )}
                disabled={!rest?.kycAllow}
                component={Link}
                to={to}
                {...rest}
              >
                {typeof icon === "string" ? (
                  <Iconify
                    icon={icon}
                    className="text-2xl mr-5 text-primary-main"
                  />
                ) : (
                  <Icon className="text-2xl mr-5 text-primary-main">
                    {icon}
                  </Icon>
                )}

                <Typography className="font-medium">{label}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Paper>
  );
}
