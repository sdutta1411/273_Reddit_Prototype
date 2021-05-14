import React, { useState } from "react";
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
import swal from "sweetalert";

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
  var user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [name, setName] = useState(user.username);

  const [gender, setGender] = useState(user.gender);
  const [location, setLocation] = useState(user.location);
  const [description, setDescription] = useState(user.description);
  const [imageSelected, setImageSelected] = useState("");
  const [publicurl, setPublicurl] = useState(localStorage.getItem("publicurl"));
  const [inputFields, setInputFields] = React.useState([{ topics: "" }]);

  debugger;
  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "i9dmdl7y");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dikqsaz3t/image/upload",
      formData
    ).then((response) => {
      setPublicurl(response.data.secure_url);
      localStorage.setItem("publicurl", response.data.secure_url);
      console.log(publicurl);
    });
  };

  const update = (e) => {
    debugger;
    e.preventDefault();
    Axios.post(" http://localhost:3001/api/user/updateUser", {
      gender: gender,
      location: location,
      description: description,
      username: name,
    }).then((response) => {
      if (response.status === 200) {
        swal("Success", "User Updated Succesfully", "success");
        localStorage.setItem(user.username, name);
        localStorage.setItem(user.gender, gender);
        localStorage.setItem(user.location, location);
        localStorage.setItem(user.description, description);
      }
    });
  };

  const handleChangeInput = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { email: "" }]);
  };

  const handleRemoveFields = (index) => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
  };

  // user;
  // topics = ["cr", "jj"];

  const doNothing = (e) => {};

  const reddit_text = "         Your Profile";

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
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        defaultValue={name}
                        onChange={(event) => {
                          event.preventDefault();
                          setName(event.target.value);
                        }}
                      />
                      <Button
                        className={classes.logo}
                        color="primary"
                        onClick={update}
                        startIcon={
                          <CreateIcon
                            fontSize="large"
                            style={{ color: "black" }}
                          />
                        }
                        size="large"
                      ></Button>
                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Gender"
                        variant="outlined"
                        defaultValue={gender}
                        onChange={(event) => {
                          event.preventDefault();
                          setGender(event.target.value);
                        }}
                      />
                      <Button
                        className={classes.logo}
                        color="primary"
                        onClick={update}
                        startIcon={
                          <CreateIcon
                            fontSize="large"
                            style={{ color: "black" }}
                          />
                        }
                        size="large"
                      ></Button>
                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        defaultValue={location}
                      />
                      <Button
                        className={classes.logo}
                        color="primary"
                        onClick={update}
                        startIcon={
                          <CreateIcon
                            fontSize="large"
                            style={{ color: "black" }}
                          />
                        }
                        size="large"
                      ></Button>
                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        defaultValue={description}
                        onChange={(event) => {
                          event.preventDefault();
                          setDescription(event.target.value);
                        }}
                      />
                      <Button
                        className={classes.logo}
                        color="primary"
                        onClick={update}
                        startIcon={
                          <CreateIcon
                            fontSize="large"
                            style={{ color: "black" }}
                          />
                        }
                        size="large"
                      ></Button>
                      <br />
                      <br />
                    </Grid>
                    <Grid item>
                      {" "}
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                      />
                      <Button
                        className={classes.logo}
                        color="primary"
                        onClick={update}
                        startIcon={
                          <CreateIcon
                            fontSize="large"
                            style={{ color: "black" }}
                          />
                        }
                        size="large"
                      ></Button>
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
          <CardMedia>
            <Image
              style={{ width: 500, height: 200 }}
              cloudName="dikqsaz3t"
              publicId={publicurl}
            />
          </CardMedia>
          <CardContent>
            <List>
              <ListItem>
                <form>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageSelected(event.target.files[0]);
                    }}
                  />
                  <br />
                  <br />

                  <Button
                    onClick={uploadImage}
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
