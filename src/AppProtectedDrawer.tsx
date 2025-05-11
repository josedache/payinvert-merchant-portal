import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  ListItemButton,
  Button,
  Popover,
  Avatar,
  ListItemIcon,
  Tooltip,
  Card,
  Icon,
} from "@mui/material";
import clsx from "clsx";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";

import useSideNavigation from "hooks/use-side-navigation";
import MediaBreakpoint from "enums/media-breakpoint";
import Logo from "components/Logo";
import useToggle from "hooks/use-toggle";
import usePopover from "hooks/use-popover";
import { DASHBOARD } from "constants/urls";
import useSidebarIcon from "hooks/use-sidebar-icon";

function AppProtectedDrawer() {
  const islg = useMediaQuery(MediaBreakpoint.LG);

  // const { logout } = useLogout();

  const infoPopover = usePopover();

  const sideNavigation = useSideNavigation();
  const sidebarIcon = useSidebarIcon();

  const NAV_LINKS = [
    {
      links: [
        {
          icon: "hugeicons:dashboard-square-01",
          label: "Dashboard",
          to: DASHBOARD,
          kycAllow: true,
        },
      ],
    },
    {
      links: [
        {
          icon: "hugeicons:wallet-add-01",
          label: "Main Wallet",
          to: "/main-wallet",
          kycAllow: false,
        },
        {
          icon: "hugeicons:money-receive-02",
          label: "Collections",
          to: "/collections",
          kycAllow: false,
        },
      ],
    },
  ];

  const collapseToIcon = islg && !sidebarIcon.isOpen;

  return (
    <>
      <div className="relative">
        <Drawer
          open={sideNavigation.isOpen}
          variant={islg ? "permanent" : "temporary"}
          anchor={islg ? "left" : "right"}
          slotProps={{
            paper: {
              className: clsx(
                collapseToIcon ? "w-[80px]" : "w-[270px]",
                "flex flex-col border-r-1 border-[#E0E5EB]  bg-background-default text-primary-contrastText transition-all",
                islg ? "" : "bg-none"
              ),
            },
          }}
          onClose={() => sideNavigation.toggle()}
        >
          <Toolbar className="flex items-center px-5 py-6 justify-between ">
            {islg && (
              <div className="flex items-center justify-between w-full">
                <div>
                  <Logo variant="2" />
                </div>

                <IconButton
                  size="small"
                  className={clsx(
                    "p-1  bg-white border-neutral-200 border-1",
                    collapseToIcon ? "opacity-0 visible" : ""
                  )}
                  onClick={sidebarIcon.toggle as any}
                >
                  <Iconify
                    icon="hugeicons:arrow-left-double"
                    width="20"
                    height="20"
                  />
                </IconButton>
              </div>
            )}
            {!islg && (
              <div className="flex gap-4">
                {" "}
                <Card
                  sx={{
                    background:
                      "linear-gradient(221deg, #C63E0E 27.25%, #FF7849 102.65%);Linear Gradient",
                  }}
                  className="p-1.5 w-[40px] h-[40px] rounded-full"
                >
                  <Avatar
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M14 7a6.98 6.98 0 0 1-1.941 4.838A6.98 6.98 0 0 1 7.02 14h-.04a6.98 6.98 0 0 1-5.039-2.162A7 7 0 1 1 14 7m-2.757 3.5A5.49 5.49 0 0 0 7 8.5a5.49 5.49 0 0 0-4.243 2A5.49 5.49 0 0 0 7 12.5a5.49 5.49 0 0 0 4.243-2M7 7.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5' clip-rule='evenodd'/%3E%3C/svg%3E"
                    className="w-full h-full text-primary-500"
                  />
                </Card>
                <Popover
                  open={infoPopover.isOpen}
                  anchorEl={infoPopover.anchorEl}
                  onClose={infoPopover.togglePopover}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  className="p-2"
                ></Popover>
                <div className=" border rounded-full w-10 h-10 border-neutral-100 ">
                  <IconButton
                    color="inherit"
                    className="bg-neutral-50"
                    disabled
                  >
                    {/* <Badge badgeContent={7} color="error"> */}
                    <Iconify
                      className="MuiIcon-root text-[#292D32]"
                      icon="hugeicons:notification-02"
                    />
                    {/* </Badge> */}
                  </IconButton>
                </div>
              </div>
            )}
            {!islg && (
              <IconButton onClick={() => sideNavigation.toggle()}>
                <Iconify icon="hugeicons:cancel-02" width="24" height="24" />
              </IconButton>
            )}
          </Toolbar>

          <List className="flex-1 min-h-0 overflow-y-auto mt-6">
            {NAV_LINKS.map(({ links }, index) => {
              return (
                <>
                  {index ? (
                    <div className="py-3s">
                      <Divider className="bg-white " />
                    </div>
                  ) : null}
                  <div className="p-3">
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
                </>
              );
            })}
          </List>
        </Drawer>

        {collapseToIcon ? (
          <IconButton
            size="small"
            className="absolute top-8 p-1  bg-white border-neutral-200 border-1 left-[65px] b-10 z-[1000000]"
            onClick={() => {
              sidebarIcon.toggle();
            }}
          >
            <Iconify
              icon="hugeicons:arrow-right-double"
              width="18"
              height="18"
            />
          </IconButton>
        ) : null}
      </div>
    </>
  );
}

export default AppProtectedDrawer;

function AppProtectedDrawerItem(props: any) {
  const item = props.item;
  const collapseToIcon = props.collapseToIcon;
  const { kycAllow, label, to, links, icon, onClick } = item;

  const [isKycDialog, toggleKycDialog] = useToggle();

  // const authUser = useAuthUser();

  const isKycCompleted = false;
  // authUser?.kyc_validation?.basic &&
  // authUser?.kyc_validation?.nin &&
  // authUser?.kyc_validation?.bank;

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
      <Tooltip title={collapseToIcon ? label : ""} arrow placement="right">
        <ListItemButton
          className={clsx(
            "rounded-lg flex gap-2 py-3 my-[6px] text-[#1D2129]",
            !!match && "bg-[#E8ECF1] "
          )}
          {...(isGroup
            ? { onClick: toggleSubMenu }
            : isKycCompleted || kycAllow
              ? onClick
                ? { onClick }
                : { component: Link, to }
              : { onClick: toggleKycDialog, disabled: true })}
        >
          <ListItemIcon
            sx={[
              {
                color: "#1D2129",
                minWidth: 0,
                justifyContent: "center",
              },
            ]}
          >
            <Iconify icon={icon} className="text-2xl" />
          </ListItemIcon>

          <Typography
            className={clsx(
              collapseToIcon ? "opacity-0" : "",
              "font-medium flex-1"
            )}
            noWrap
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
      </Tooltip>

      <Dialog open={isKycDialog} fullWidth onClose={toggleKycDialog}>
        <DialogContent>
          <div className="flex flex-col gap-4 items-center">
            <Icon color="warning" className="text-8xl">
              sentiment_satisfied
            </Icon>
            <Typography className="text-center text-text-secondary">
              Your KYC information is incomplete please update your profile to
              yield and perform other actions.
            </Typography>
            <Button
              // component={Link}
              // to={DASHBOARD_KYC}
              onClick={toggleKycDialog as any}
              className="mt-4"
            >
              Update profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
