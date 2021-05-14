import React, {useState, useEffect} from 'react'
// import NavBarAfterLogin from '../navBar/NavBarAfterLogin'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from "../../images/BMWm5.jpg";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Apirequest from "../../backendRequestApi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));

export const MyCommunity = () => {
    const classes = useStyles();
   
    const [open, setOpen] = useState(false);
    const [communities,setCommunities] =useState([]);

    const handleOpen = () => {
        setOpen(true);

      };
    
      const handleClose = () => {
        setOpen(false);
      };
   
    useEffect(() => {
      getallCommunities();
        
    },[])


    const getallCommunities = () =>{

      // const email = localStorage.getItem("email");
      const email = {email:"bhagi@gmail.com"};
      

      axios.defaults.withCredentials = true;
      axios
        .post(`${Apirequest}/api/community/getAllOwnerCommunities`, email)
        .then(({data}) => {
          console.log(data);
          setCommunities(data);
          
        })
        .catch((error) => {
          console.log("error occured while connecting to backend:", error);
        });

    }
  
    return (
        <div>
            <h3>My Communities</h3>
            {communities.map((community) =>(
              <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                   {community.communityName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                   {community.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={handleOpen}>
                  View
                </Button>
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
        
              <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
              </div>
            </Fade>
              </Modal>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>

            ))}
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={img}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                 BMW M5
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  4.4 V8 bombarding
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={handleOpen}>
                View
              </Button>
              <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
      
            <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
            </Modal>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </div>
    )
}


