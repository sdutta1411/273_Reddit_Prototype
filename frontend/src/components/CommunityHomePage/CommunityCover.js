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
import backendUrl from '../../backendUrl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useEffect ,useState,setState} from 'react'


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


export default function CommunityCover({communityName,isUserSub}) {
  const baseUrl = `${backendUrl}/api/posts`;
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = userLocalStorage.token;
  const email = userLocalStorage.email;

  const[openJoinComm, setOpenJoinComm] = useState(false);
  const[openLeaveComm, setOpenLeaveComm] = useState(false);


  const history = useHistory();

    const classes = useStyles();
    const theme = useTheme();

    const handleCreatePost = () =>{
      history.push('/createpost');
    }

    const handleJoinCommunity = async() =>{
      console.log("calling join community api");
      try {
        const headers = {
          'Content-Type': 'application/json' ,
          'Authorization': token
        }
        const body = {
         'email':email,'communityName':'Avengers'
        }
        const response = await axios.post('http://localhost:3001/api/community/joinCommunity',body,{
          headers: headers
        });
        if(response.status===200){
          console.log("Response: "+response.data);
          setOpenJoinComm(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

      const handleLeaveCommunity = async() =>{
      console.log("Calling leave community");
      try{
        const headers = {
          'Content-Type': 'application/json' ,
          'Authorization': token
        }
        const body = {
         'email':email,'communityName':'Avengers'
        }
        const response = await axios.post('http://localhost:3001/api/community/leaveCommunity',body,{
          headers: headers
        });
        if(response.status===200){
          console.log("Response: "+response.data);
          setOpenLeaveComm(true);
        }
      }catch(err){
        console.log("Error while leaving group: "+err);
      }
    }

    function Alert(props) {
      return <MuiAlert elevation={10} variant="filled" {...props} />;
    }
    const handleJoinCommClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }    
      setOpenJoinComm(false);
    };

    const handleLeaveCommClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }    
      setOpenLeaveComm(false);
    };
    
    return (
        <>
            <Snackbar open={openJoinComm} autoHideDuration={6000} onClose={handleJoinCommClose}>
                    <Alert style={{fontSize:"20px"}} onClose={handleJoinCommClose} severity="success">
                        You joined community
                    </Alert>
            </Snackbar>

            <Snackbar open={openLeaveComm} autoHideDuration={6000} onClose={handleLeaveCommClose}>
                    <Alert style={{fontSize:"20px"}} onClose={handleLeaveCommClose} severity="error">
                        You left community
                    </Alert>
            </Snackbar>

        <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography style={{marginLeft:"70px"}}>
              Group Name
            {isUserSub?
            <Button onClick={handleLeaveCommunity} style={{textTransform:"none",fontWeight:"bold",marginLeft:"200px",fontSize:"12px",textAlign:"center",color:"#FFFFFF",background:"#0079D3",borderRadius:"10px"}} variant="contained">
              Joined
            </Button>:
            <Button onClick={handleJoinCommunity} style={{textTransform:"none",fontWeight:"bold",marginLeft:"200px",fontSize:"12px",textAlign:"center",color:"#FFFFFF",background:"#0079D3",borderRadius:"10px"}} variant="contained">
              Join
            </Button>
            }
            <Button onClick={handleCreatePost} style={{textTransform:"none",fontWeight:"bold",marginLeft:"700px",fontSize:"14px",textAlign:"center",color:"#FFFFFF",background:"#2ECC40",borderRadius:"10px"}} variant="contained">
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
