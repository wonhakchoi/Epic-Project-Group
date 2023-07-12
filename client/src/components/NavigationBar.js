// import React from "react";
// import { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import { Link } from "react-router-dom";
// import PeopleIcon from '@mui/icons-material/People';
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// export default function ButtonAppBar() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = (open) => () => {
//     setIsDrawerOpen(open);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: "#a3ccbc" }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//             onClick={toggleDrawer(true)} // Open the side menu on click
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
//           >
//             <img src="/images/logo/logo.png" alt="Logo" style={{ height: 42, marginRight: 10 }} />
//           </Typography>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/login"
//             sx={{ marginLeft: "auto" }}
//           >
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="left"
//         open={isDrawerOpen}
//         onClose={toggleDrawer(false)} // Close the side menu on click
//       >
//         <List>
//         <ListItem button component={Link} to="/profile">
//             <ListItemIcon>
//               <AccountCircleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Profile" />
//           </ListItem>
//           <ListItem button component={Link} to="/friends">
//             <ListItemIcon>
//               <PeopleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Friends" />
//           </ListItem>
//           <ListItem button component={Link} to="/collections">
//             <ListItemIcon>
//               <ShoppingBagIcon />
//             </ListItemIcon>
//             <ListItemText primary="Collections" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </Box>
//   );
// }

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

export default function ButtonAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#a3ccbc" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Open the side menu on click
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <img src="/images/logo/logo.png" alt="Logo" style={{ height: 42, marginRight: 10 }} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)} // Close the side menu on click
      >
        <List sx={{ marginTop: 2 }}>
          <ListItem button component={Link} to="/profile" onClick={handleCloseDrawer}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/friends" onClick={handleCloseDrawer}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button component={Link} to="/collections" onClick={handleCloseDrawer}>
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText primary="Collections" />
          </ListItem>
          <ListItem button component={Link} to="/login" onClick={handleCloseDrawer}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}