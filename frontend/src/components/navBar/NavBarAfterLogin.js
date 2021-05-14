import React from 'react'
import {Link} from 'react-router-dom';
import redditlogo from '../../assets/redditlogo.png';
import {Image} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import  '../../styles/navbar.css';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MyCommunity from '../MyCommunity/MyCommunity'


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
  }));
export default function NavBarAfterLogin() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleLogout = () => {
      localStorage.removeItem("user");
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" style={{background:"#FFFFFF"}}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <Image  style={{width:"90px",height:"30px"}} src={redditlogo}
             to="/landing"
             />
            </IconButton>
            {/* <Typography variant="h2" className={classes.title}>
            <Link style={{textDecoration:"none", color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif"}} to="landing">Splitwise</Link>
            </Typography> */}
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                //onClick={handleMenu}
                color="inherit"
                
              >
                {/* <AccountCircle style={{fontSize:"30px"}} /> */}
                <Avatar alt="user"  />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                style={{float:"right"}}
                open={open}
                onClose={handleClose}
              >
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='userprofile'>Profile</MenuItem>
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='usersettings'>User Settings</MenuItem>
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link} to='MyCommunity'>MyCommunity</MenuItem>
                <MenuItem style={{textDecoration:"none",fontSize:"17px"}} component={Link}  onClick={handleLogout} to='landing'>Logout</MenuItem>
              </Menu>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
}
