import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import RedditIcon from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import img from "../../images/Reddit.png";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin } from "../../actions/loginAction";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const history = useHistory();
  let redirectVar = null;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email === "" || inputs.password === "") {
      swal("Error", "Enter Details to Login", "error", {
        dangerMode: true,
      });
    }

    console.log(inputs);
    props.userLogin(inputs);
    console.log(props.user);
    if (props.user.status == true) {
      console.log("redirect");
      history.push("/dashboard");
    }

    handleClose();
  };

  // const loadSuccess = () =>{
  //   history.push('/dashboard');
  // }

  return (
    <div>
      {redirectVar}
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container style={{ height: "50%", width: "60%" }}>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={3}
              md={5}
              className={classes.image}
            ></Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <RedditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={inputs.email}
                  />
                  <br />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                    value={inputs.password}
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
                    Sign In
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

SignIn.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};
export default connect(mapStateToProps, { userLogin })(SignIn);
