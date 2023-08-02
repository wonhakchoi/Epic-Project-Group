import React, {useState, useEffect} from 'react';
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
import {Link} from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from "react-cookie";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";
import {doLogout} from "../redux/reducers/authenticationSlice";

export default function ButtonAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.sauth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        dispatch(postAuthAsync(cookies.token))
            .then((data) => {
                const s = data.payload.status;
                if (s) {
                    setCookie('token', data.payload.token);
                } else {
                    setCookie('token', null);
                }
            })
    }, [cookies, navigate, setCookie]);


    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleLogout = () => {
        removeCookie('token')
        dispatch(doLogout());
        setIsDrawerOpen(false);
        navigate("/login");
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: "#FFF4BB"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="#ffffff"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={toggleDrawer(true)} // Open the side menu on click
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{textDecoration: "none", color: "inherit", flexGrow: 1}}
                    >
                        <img src="/images/logo/logo.png" alt="Logo"
                             style={{height: 62, marginRight: 10, marginTop: 10}}/>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)} // Close the side menu on click
            >
                <List sx={{marginTop: 2}}>
                    <ListItem component={Link} to="/search" onClick={handleCloseDrawer}>
                        <ListItemIcon sx={{color: "#000000"}}>
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Search"/>
                    </ListItem>
                    <ListItem component={Link} to="/profile" onClick={handleCloseDrawer}>
                        <ListItemIcon sx={{color: "#000000"}}>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem component={Link} to="/friends" onClick={handleCloseDrawer}>
                        <ListItemIcon sx={{color: "#000000"}}>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Friends"/>
                    </ListItem>
                    <ListItem component={Link} to="/collections" onClick={handleCloseDrawer}>
                        <ListItemIcon sx={{color: "#000000"}}>
                            <ShoppingBagIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Collections"/>
                    </ListItem>

                    {
                        isLoggedIn ?
                            (<ListItem component={Link} onClick={() => {handleLogout()}}>
                                <ListItemIcon sx={{color: "#000000"}}>
                                    <LockOpenIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Log out"/>
                            </ListItem>) :
                            <ListItem button component={Link} to="/login" onClick={handleCloseDrawer}>
                                <ListItemIcon>
                                    <LockOpenIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Login"/>
                            </ListItem>

                    }
                    {/* <ListItem button component={Link} to="/login" onClick={handleLogout}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem> */}

                </List>
            </Drawer>
        </Box>
    );
}