import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAppstore } from "../appStore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { NavLink } from "react-router-dom";
import "../Components/css/sidenav.css";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SavingsIcon from '@mui/icons-material/Savings'; 

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidenavName = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 56, // Adjust height as needed
  backgroundColor: "#333", // Adjust background color as needed
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  overflow: "hidden",
  whiteSpace: "nowrap",
  "&:hover": {
    height: "100%", // Expand height on hover
  },
});

export default function MiniDrawer() {
  const theme = useTheme();
  const open = useAppstore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex" }} className="sidenav-bg">
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "#101010" }}
      >
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/admin-dashboard"
            activeClassName="active"
            className="hoverinfo"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/add-user"
            className="hoverinfo"
            activeClassName="active"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Add User"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/manage-user"
            activeClassName="active"
            className="hoverinfo"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Manage Users"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/payment-detail"
            className="hoverinfo"
            activeClassName="active"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Payment's"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/new-joining-request"
            className="hoverinfo"
            activeClassName="active"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HandshakeIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="New Joining Req."
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>


          


          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/user-complaint"
            className="hoverinfo"
            activeClassName="active"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewReleasesIcon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Complaint's"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={NavLink}
            to="/create-admin"
            className="hoverinfo"
            activeClassName="active"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText
                className="text-sidenav-section"
                primary="Create Admin"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
