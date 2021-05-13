import React from "react";
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

const UserProfile = () => {
  const classes = useStyles();
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
                      Profile Details
                    </Typography>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Gender"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>{" "}
                </form>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              style={{
                maxWidth: "40px",
                backgroundColor: "orange",
                color: "whitesmoke",
              }}
            >
              Update
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="Profile Pic"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Profile Pic"
          />
          <CardContent>
            <List>
              <ListItem>
                <form>
                  <input type="file" />
                  <br />
                  <br />

                  <Button
                    size="small"
                    color="primary"
                    style={{
                      backgroundColor: "orange",
                      color: "whitesmoke",
                    }}
                  >
                    Upload Image
                  </Button>
                </form>
              </ListItem>
            </List>

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

          <CardActions>
            <Button
              size="small"
              color="primary"
              style={{
                maxWidth: "40px",
                backgroundColor: "orange",
                color: "whitesmoke",
              }}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};

export default UserProfile;
