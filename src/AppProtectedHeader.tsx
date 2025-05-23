import {
  AppBar,
  AppBarProps,
  Avatar,
  Badge,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogProps,
  Divider,
  Icon,
  IconButton,
  ListItemButton,
  Paper,
  Popover,
  Switch,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import clsx from "clsx";

import usePopover from "hooks/use-popover";
import useSideNavigation from "hooks/use-side-navigation";
import Logo from "components/Logo";
import useSidebarIcon from "hooks/use-sidebar-icon";
import useAuthUser from "hooks/use-auth-user";
import useLogout from "hooks/use-logout";
import PageHeader from "components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD, DASHBOARD_ONBOARDING } from "constants/urls";
import firstCharToUpperCase from "utils/string/first-char-toUpperCase";
import React from "react";
import useToggle from "hooks/use-toggle";

function AppProtectedHeader(props: AppBarProps) {
  const { ...restProps } = props;
  const [checked, setChecked] = React.useState(false);
  const [openIncompleteKycDialog, toggleOpenIncompleteKycDialog] = useToggle();
  const location = useLocation();
  const { pathname } = location;

  const infoPopover = usePopover();
  const authUser = useAuthUser();
  const { logout } = useLogout();
  const sideNavigation = useSideNavigation();
  const sidebarIcon = useSidebarIcon();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      toggleOpenIncompleteKycDialog();
      return;
    }
    setChecked(isChecked);
  };

  const isDashboard = pathname === DASHBOARD;

  const allPaths = pathname.split("/").filter((item) => item !== "");
  const highlightedPath = [...allPaths].splice(1); // Exclude the first item
  const getPathLink = (item) =>
    allPaths
      .slice(0, allPaths?.findIndex((path) => path === item) + 1)
      .join("/")
      .replace(/-/g, "_");

  const breadCrumbs = isDashboard
    ? [
        {
          name: "Dashboard",
          to: DASHBOARD,
        },
      ]
    : highlightedPath?.map((item) => ({
        name: firstCharToUpperCase(item?.split("-")).join(" "),
        to: getPathLink(item),
      }));

  return (
    <>
      {" "}
      <AppBar
        elevation={0}
        position="sticky"
        color="inherit"
        sx={{
          backgroundColor: "background.default",
        }}
        className={clsx(
          sidebarIcon.isOpen
            ? "lg:w-[calc(100%-270px)] lg:ml-[270px]"
            : "lg:w-[calc(100%-80px)]  lg:ml-[80px]",
          "w-full rounded-none bg-none pt-4"
        )}
        {...restProps}
      >
        <Paper className="py-4">
          <div className="md:flex hidden items-center justify-center gap-2 px-6 w-full">
            <IconButton
              className="lg:hidden"
              color="inherit"
              onClick={() => sideNavigation.toggle()}
            >
              <Icon>
                <Iconify icon="material-symbols:menu" />
              </Icon>
            </IconButton>

            <div>
              <PageHeader breadcrumbs={breadCrumbs} />
            </div>

            <div className="flex-1" />

            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />

            <IconButton>
              <Badge variant="dot" color="error">
                <Iconify
                  className="MuiIcon-root"
                  icon="pajamas:notifications"
                />
              </Badge>
            </IconButton>

            <ButtonBase className="rounded-full">
              <Avatar
                color="inherit"
                onClick={infoPopover.togglePopover}
                src=""
                className="w-[40px] h-[40px]"
              />
            </ButtonBase>

            <Popover
              open={infoPopover.isOpen}
              anchorEl={infoPopover.anchorEl}
              onClose={infoPopover.togglePopover}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              className="mt-2"
            >
              <Paper className="p-3">
                <div className="py-3">
                  <Typography
                    variant="subtitle1"
                    className="font-semibold capitalize text-gray-600"
                    noWrap
                  >
                    {[authUser?.user?.firstName, authUser?.user?.lastName]
                      .map((name) => name?.toLocaleLowerCase())
                      .join(" ")}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500" noWrap>
                    {authUser?.user?.emailAddress?.toLocaleLowerCase()}
                  </Typography>
                </div>

                <Divider />

                <div className="space-y-2 mt-1">
                  <ListItemButton
                    className="rounded-lg"
                    color="error"
                    onClick={() => logout()}
                  >
                    <Iconify
                      icon="hugeicons:logout-02"
                      width="20"
                      height="20"
                      className="text-error-main mr-2"
                    />
                    <Typography color="error" variant="body2">
                      Sign out
                    </Typography>
                  </ListItemButton>
                </div>
              </Paper>
            </Popover>
          </div>

          <div className="flex md:hidden items-center justify-between gap-2 px-8 w-full">
            <Logo className="w-full h-full max-w-[90px]" variant="2" />

            <IconButton onClick={() => sideNavigation.toggle()}>
              <Icon>
                <Iconify icon="material-symbols:menu" />
              </Icon>
            </IconButton>
          </div>
        </Paper>
      </AppBar>
      <IncompleteKycDialog
        open={openIncompleteKycDialog}
        onClose={toggleOpenIncompleteKycDialog}
        className="flex items-center justify-center"
      />
    </>
  );
}

const IncompleteKycDialog = (props: DialogProps) => {
  const navigate = useNavigate();
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "400px",
        },
      }}
      {...props}
      fullWidth
      maxWidth="xl"
      className="flex items-center justify-center"
    >
      <DialogContent>
        <div className="">
          <Typography variant="h6" className="font-semibold">
            Incomplete KYC
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Please complete your KYC to switch to the live environment.
          </Typography>

          <div className="flex justify-end">
            <Button
              variant="contained"
              className="mt-10"
              endIcon={
                <Iconify
                  width={12}
                  height={12}
                  icon="material-symbols:arrow-forward-ios"
                />
              }
              onClick={() => {
                navigate(DASHBOARD_ONBOARDING);
                props.onClose(null, "backdropClick");
              }}
            >
              Go to KYC
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppProtectedHeader;
