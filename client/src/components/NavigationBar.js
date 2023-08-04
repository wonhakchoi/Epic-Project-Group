import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { verifySession } from "../redux/actions/authActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ButtonAppBar() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xs"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { error, user, isLoggedIn } = useSelector(
    (state) => state.authentication.authentication
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    return () => {
      dispatch(verifySession(cookies));
    };
  }, [dispatch]);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    setIsDrawerOpen(false);
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <Box sx={{ flexGrow: 1, fontSize: "2rem" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FFF4BB" }}
      >
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="#ffffff"
            aria-label="menu"
            sx={{ mr: 2, height: "5vh", width: "8vh" }}
            onClick={toggleDrawer(true)} // Open the side menu on click
          >
            <MenuIcon sx={{ fontSize: "4vh" }} />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "#ffffff", flexGrow: 1 }}
          >
            <img
              src="/images/logo/logo.png"
              alt="Logo"
              style={{
                height: "10vh",
                marginRight: "1rem",
                marginTop: "1rem",
                marginBottom: "0.6rem",
              }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)} // Close the side menu on click
        sx={{
          flexShrink: 0,
          width: "15%",
          "& .MuiDrawer-paper": {
            width: "12%",
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <List sx={{ marginTop: "1.2rem" }}>
          <ListItem
            button
            component={Link}
            to="/search"
            onClick={handleCloseDrawer}
            sx={{
              "&:hover": {
                background: "#e1e1e1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000000" }}>
              <SearchIcon sx={{ fontSize: "3.3vh" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ width: "100%" }}
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "2.5vh",
                  }}
                >
                  Search
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/profile"
            onClick={handleCloseDrawer}
            sx={{
              "&:hover": {
                background: "#e1e1e1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000000" }}>
              <AccountCircleIcon sx={{ fontSize: "3.3vh" }} />
            </ListItemIcon>
            {/* <ListItemText primary="Profile" /> */}
            <ListItemText
              sx={{ width: "100%" }}
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "2.5vh",
                  }}
                >
                  Profile
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/friends"
            onClick={handleCloseDrawer}
            sx={{
              "&:hover": {
                background: "#e1e1e1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000000" }}>
              <PeopleIcon sx={{ fontSize: "3.3vh" }} />
            </ListItemIcon>
            {/* <ListItemText primary="Friends" /> */}
            <ListItemText
              sx={{ width: "100%" }}
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "2.5vh",
                  }}
                >
                  Friends
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/discover"
            onClick={handleCloseDrawer}
            sx={{
              "&:hover": {
                background: "#e1e1e1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000000" }}>
              <ExploreIcon sx={{ fontSize: "3.3vh" }} />
            </ListItemIcon>
            {/* <ListItemText primary="Discover" /> */}
            <ListItemText
              sx={{ width: "100%" }}
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "2.5vh",
                  }}
                >
                  Discover
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/collections"
            onClick={handleCloseDrawer}
            sx={{
              "&:hover": {
                background: "#e1e1e1",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000000" }}>
              <ShoppingBagIcon sx={{ fontSize: "3.3vh" }} />
            </ListItemIcon>
            {/* <ListItemText primary="Collections" /> */}
            <ListItemText
              sx={{ width: "100%" }}
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "2.5vh",
                  }}
                >
                  Collections
                </Typography>
              }
            />
          </ListItem>

          {isLoggedIn ? (
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  background: "#e1e1e1",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#000000" }}>
                <LockOpenIcon sx={{ fontSize: "3.3vh" }} />
              </ListItemIcon>
              {/* <ListItemText primary="Log out" /> */}
              <ListItemText
                sx={{ width: "100%" }}
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "2.5vh",
                    }}
                  >
                    Logout
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleCloseDrawer}
            >
              <ListItemIcon sx={{ color: "#000000" }}>
                <LockOpenIcon sx={{ fontSize: "3.3vh" }} />
              </ListItemIcon>
              {/* <ListItemText primary="Login" /> */}
              <ListItemText
                sx={{ width: "100%" }}
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "2.5vh",
                    }}
                  >
                    Login
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
