import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import Divider from '@material-ui/core/Divider';

export default function CreatePostHeader() {
    return (
            <Grid style={{marginLeft:"230px"}} item xs={6}>
            <Paper>
            <Button
            startIcon={<PostAddRoundedIcon />} 
            style={{color:"#999",fontSize:"16px",marginLeft:"20px",textTransform:"none"}} 
            component={Link} to="/createpost/post">
            Post
            </Button> 
            {/* &nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp; */}
            <Button
            startIcon={<ImageRoundedIcon />}  
            style={{color:"#999",fontSize:"16px",marginLeft:"180px",textTransform:"none"}} 
            component={Link} to="/createpost/imageandvideo">
            Image&Video
            </Button> 
            {/* &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; */}
            <Button
            startIcon={<InsertLinkRoundedIcon />} 
            style={{color:"#999",fontSize:"16px",marginLeft:"200px",textTransform:"none"}} 
            component={Link} to="/createpost/link">
            Link
            </Button> 
            </Paper>
            </Grid>
    )
}
