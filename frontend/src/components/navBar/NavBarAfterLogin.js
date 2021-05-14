import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
//import image from "../../static/images/splitwise.png";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, useHistory } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import redditlogo from "../../assets/redditlogo.png";
import { Image } from "react-bootstrap";
import { colors } from "@material-ui/core";
import { shadows } from "@material-ui/system";
import MyCommunity from "../MyCommunity/MyCommunity";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  media: {
    height: 500,
    width: 500,
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/home");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" boxshadow={3} style={{ background: "#ebf7f6" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={()=>{history.push('/dashboard')}}
          >
            <Image
              style={{ width: "90px", height: "30px" }}
              src={redditlogo}
              to="/"
            />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ color: "black" }}
          >
            Home Page of the Internet
          </Typography>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ color: "black" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="profile"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="usersettings"
                >
                  User Settings
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="MyCommunity"
                >
                  MyCommunity
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="analytics"
                >
                  Analytics
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="/chatList"
                  onClick={handleClose}
                >
                  Messages
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  to="invites"
                  onClick={handleClose}
                >
                  Invites
                </MenuItem>
                <MenuItem
                  style={{ textDecoration: "none", fontSize: "17px" }}
                  component={Link}
                  onClick={handleLogout}
                  to="/"
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
