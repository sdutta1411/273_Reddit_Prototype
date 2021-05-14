import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Image } from "cloudinary-react";
import Axios from "axios";
import RedditIcon from "@material-ui/icons/Reddit";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 3),
    maxWidth: 500,
    marginLeft: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    minHeight: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const User = () => {
  useEffect(() => {
    getDetails();
  });
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const [gender, setGender] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();

  debugger;

  const getDetails = (e) => {
    e.preventDefault();
    Axios.defaults.withCredentials = true;
    Axios.post("http://localhost:3001/api/user/getUserDetails", {
      email: email,
    }).then((response) => {
      name = response.data.name;
      gender = response.data.gender;
      location = response.data.location;
      description = response.data.description;
    });
  };

  const doNothing = (e) => {};

  const reddit_text = "         User Profile";

  return (
    <div>
      <Grid
        container
        className={classes.root}
        justify="space-evenly"
        style={{ minWidth: "1200px", height: "800px" }}
      >
        <Card className={classes.root}>
          <CardContent>
            <List>
              <ListItem>
                <form>
                  {" "}
                  <Grid container direction={"column"} spacing={5}>
                    <Typography variant="h5" component="h2">
                      <RedditIcon />
                      {reddit_text}
                    </Typography>
                    <Grid item>
                      <Typography variant="h5" component="h2">
                        Name:
                      </Typography>

                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2">
                        Gender:
                      </Typography>

                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2">
                        Location:
                      </Typography>

                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2">
                        Description:
                      </Typography>

                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <br />
                      <br />
                    </Grid>
                  </Grid>{" "}
                </form>
              </ListItem>
            </List>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <br />
            <br />

            <br />
            <br />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Topic List 1
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id="outlined-basic"
                  label="Topic"
                  variant="outlined"
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Topic List 2
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id="outlined-basic"
                  label="Topic"
                  variant="outlined"
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Topic List 3
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id="outlined-basic"
                  label="Topic"
                  variant="outlined"
                />
              </AccordionDetails>
            </Accordion>
          </CardContent>

          <CardActions></CardActions>
        </Card>
      </Grid>
    </div>
  );
};

export default User;
