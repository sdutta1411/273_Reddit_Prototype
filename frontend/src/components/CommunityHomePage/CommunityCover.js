import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import API_URL from '../../config/constants';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));


export default function CommunityCover() {
  const history = useHistory();

    const classes = useStyles();
    const theme = useTheme();

    const handleCreatePost = () =>{
      history.push('/createpost');
    }
    
    return (
        <>


        <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography style={{marginLeft:"70px"}} component="h5" variant="h5">
              Group Name
            <Button onClick={handleCreatePost} style={{fontWeight:"bold",marginLeft:"1000px",fontSize:"16px",padding:"10px 20px 10px 20px",textAlign:"center",lineHeight:"20.7px",color:"#FFFFFF",background:"#2ECC40",borderRadius:"10px"}} variant="contained">
            Create Post
            </Button>
            </Typography>
            
            {/* <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography> */}
          </CardContent>
          </div>
          </Card>
          

          {/* }

          {/* <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>Group name</Paper>
            </Grid>
          </Grid> */}
          <br/>

          {/* <Grid style={{marginLeft:"260px"}} container spacing={5}>
            <Grid item xs={6}>
            
            <Paper className={classes.paper}>
            <TextField size="medium" id="filled-basic" label="Create Post" variant="filled" />
            </Paper>
            </Grid>
          </Grid> */}



          </>
    )
}
