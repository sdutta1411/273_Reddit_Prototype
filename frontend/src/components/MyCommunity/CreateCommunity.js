import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import RedditIcon from "@material-ui/icons/Reddit";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Apirequest from "../../backendRequestApi";
import axios from "axios";
import Axios from "axios";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  root1: {
    height: "100vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper1: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const CreateCommunity = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageSelected, setImageSelected] = useState("");
  const [publicurl, setPublicurl] = useState(
    localStorage.getItem("community_image_url")
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const fileSelectedHandler = (e) => {
    setFiles({ files: [...files, ...e.target.files] });
  };

  const uploadImage = (e) => {
    debugger;
    const formData = new FormData();
    formData.append("file", imageSelected);

    formData.append("upload_preset", "i9dmdl7y");
    Axios.defaults.withCredentials = true;
    Axios.post(
      "https://api.cloudinary.com/v1_1/dikqsaz3t/image/upload",
      formData
    )
      .then((response) => {
        setPublicurl(response.data.secure_url);
        localStorage.setItem("community_image_url", response.data.secure_url);
        console.log(publicurl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    axios.defaults.withCredentials = true;
    console.log(inputs);
    setInputs((inputs) => ({
      ...inputs,
      admin: "bhagi@gmail.com",
    }));
    console.log(inputs);
    axios
      .post(`${Apirequest}/api/community/createnewcommunity`, inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
    handleClose();
    uploadImage();
  };

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        <AddIcon /> Create Community
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container>
          <Grid container component="main" className={classes.root1}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper1}>
                <Avatar className={classes.avatar}>
                  <RedditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Community
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="communityName"
                    label="Community Name"
                    name="communityName"
                    autoComplete="communityName"
                    onChange={handleInputChange}
                    value={inputs.email}
                  />
                  <br />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="description"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    fullWidth
                    name="description"
                    onChange={handleInputChange}
                    value={inputs.Description}
                  />
                  <br />
                  <br />
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageSelected(event.target.files[0]);
                    }}
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create
                  </Button>

                  <Box mt={5}></Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </div>
  );
};
