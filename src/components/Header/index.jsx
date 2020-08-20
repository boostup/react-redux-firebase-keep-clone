import { login, logout, user, isSignedIn } from "../../database";
import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import SearchBar from "./SearchBar";
import "./Header.css";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (e) => {
    // const path = e.target.getAttribute("path");
    // if (path) props.history.push(path);
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    closeMenu();
    await login();
  };

  const handleLogout = async () => {
    closeMenu();
    await logout();
  };

  const goHome = () => {
    props.history.push("/");
    closeMenu();
  };

  return (
    <div>
      <AppBar id="app-bar" className="Header" position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            React List Item repo
          </Typography>

          <SearchBar onSearchSubmit={props.onSearchSubmit} />

          <div className={classes.grow} />

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={null}
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            {isSignedIn ? (
              <img
                referrerPolicy="no-referrer"
                className="Header_user-photo"
                src={user.photoURL}
                alt={user.displayName}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            <MenuItem onClick={goHome}>Home</MenuItem>
            {isSignedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
      {/* This second toolbar is so that the top of the page contents is not hidden by the AppBar */}
      <Toolbar />
    </div>
  );
};

export default withRouter(Header);
