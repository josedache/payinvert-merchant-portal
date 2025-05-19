import { useMemo } from "react";
import {
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  ListItemButton,
  Popover,
  Avatar,
  Paper,
  Badge,
  Collapse,
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

function AppProtectedDrawer() {
  const isLg = useMediaQuery(MediaBreakpoint.LG);

  const infoPopover = usePopover();

  const sideNavigation = useSideNavigation();
  const sidebarIcon = useSidebarIcon();

  const NAV_LINKS = [
    {
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
          ],
        },
        {
          label: "Business",
          to: urlsConstant.BUSINESS,
          kycAllow: true,
          links: [
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Transactions",
              to: urlsConstant.BUSINESS_TRANSACTIONS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Invoices",
              to: urlsConstant.INVOICE,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Customers",
              to: urlsConstant.BUSINESS_CUSTOMERS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Payment Links",
              to: urlsConstant.BUSINESS_PAYMENT_LINKS,
              kycAllow: true,
            },
          ],
        },
        {
          label: "Account",
          to: urlsConstant.ACCOUNT,
          kycAllow: true,
          links: [
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Settlements",
              to: urlsConstant.ACCOUNT_SETTLEMENTS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Payouts",
              to: urlsConstant.ACCOUNT_PAYOUTS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Balances",
              to: urlsConstant.BALANCE,
              kycAllow: true,
            },
          ],
        },
        {
          label: "Settings",
          to: urlsConstant.SETTINGS,
          kycAllow: true,
          links: [
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Business",
              to: urlsConstant.SETTINGS_BUSINESS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Compliance Information",
              to: urlsConstant.SETTINGS_COMPLIANCE_INFO,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Payout Accounts",
              to: urlsConstant.SETTINGS_PAYOUT_ACCOUNTS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Roles & Permissions",
              to: urlsConstant.SETTINGS_ROLES_AND_PERMISSIONS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Users",
              to: urlsConstant.SETTINGS_USERS,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "Preferences",
              to: urlsConstant.SETTINGS_PREFERENCES,
              kycAllow: true,
            },
            {
              icon: "hugeicons:dashboard-square-01",
              label: "API Keys & Webhooks",
              to: urlsConstant.SETTINGS_API_WEBHOOKS,
              kycAllow: true,
            },
          ],
        },
      ],
    },
  ];

  const collapseToIcon = isLg && !sidebarIcon.isOpen;

  return (
    <>
      <div className="relative">
        <Drawer
          open={sideNavigation.isOpen}
          variant={isLg ? "permanent" : "temporary"}
          anchor={isLg ? "left" : "right"}
          slotProps={{
            paper: {
              className: clsx(
                collapseToIcon ? "w-[80px]" : "w-[270px]",
                "flex flex-col border-0 pl-4 pr-4 md:pr-0 bg-background-default text-primary-contrastText transition-all",
                isLg ? "" : "bg-none"
              ),
            },
          }}
          onClose={() => sideNavigation.toggle()}
        >
          <Toolbar className="flex items-center px-0 pt-4  justify-between ">
            {isLg && (
              <Paper className="py-4 px-3 w-full flex justify-center">
                \
                <Logo className="w-full h-full max-w-[150px]" variant="2" />
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
            {NAV_LINKS.map(({ links }) => {
              return (
                <div>
                  {links.map((item, index) => {
                    return (
                      <AppProtectedDrawerItem
                        key={index}
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
    </>
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
    <>
      <Paper
        elevation={!!match || !isSubMenu ? 0 : 1}
        className={clsx(
          "mb-6 p-0 mt-0 overflow-hidden",
          !!match || isSubMenu ? "bg-white" : "bg-transparent"
        )}
      >
        <ListItemButton
          disableRipple
          disableTouchRipple
          disableGutters
          className={clsx(
            "flex px-4 gap-2 py-3 ",
            !!match && !isGroup && "bg-[#EDFAF1] text-primary-contrastText"
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
              icon={isSubMenu ? "mingcute:up-line" : "mingcute:down-line"}
            />
          )}
        </ListItemButton>

        {isGroup && (
          <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {links?.map(
                ({ label, icon, to, toMatchExclude, ...rest }, index) => (
                  <ListItemButton
                    key={index}
                    selected={
                      match?.pathnameBase === to &&
                      !toMatchExclude?.includes(match?.pathname)
                    }
                    className={clsx(
                      "px-4 font-bold rounded-none py-3",
                      match?.pathnameBase === to &&
                        !toMatchExclude?.includes(match?.pathname) &&
                        "bg-[#EDFAF1] text-[#016E20]"
                    )}
                    component={Link}
                    to={to}
                    {...rest}
                  >
                    <Iconify
                      icon={icon}
                      className="text-2xl mr-5 text-[#19943C]"
                    />

                    <Typography className="font-medium">{label}</Typography>
                  </ListItemButton>
                )
              )}
            </List>
          </Collapse>
        )}
      </Paper>
    </>
  );
}
