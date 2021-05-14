/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import ErrorDialog from "./ErrorDialog";
import axios from "axios";
import ApiRequest from "../../backendRequestApi";

//////////////////////////////////
// This Page Needs 4 APIs
// 1. Get MyCommunities (same as analytics)
// 2. Get All users
// 3. Send Invites
// 4. View Invite Status + Time it was accepted
// 5. Notification for user on pending invites??
//////////////////////////////////
// If implementing notification then we need to create an invites page for user OR display invites on this page itself.
// Notification???
//////////////////////////////////
// import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    // display: "flex",
  },
  pageTitle: {
    fontSize: "30px",
    marginTop: "1%",
    marginLeft: "3%",
  },
  formRow: {
    // marginLeft: "1%",
    overflowX: "auto",
  },
  body: {
    paddingLeft: "40px",
  },
  test: {
    display: "inline",
  },
  selectInput: {
    width: "200px",
  },
  button: {
    marginTop: 20,
  },
  subtitle: {
    paddingTop: "2%",
  },
  inviteLists: {
    fontSize: "18px",
  },
  inviteButton: {
    float: "right",
    marginRight: "10%",
  },
}));

export default function CommunityInvitePage() {
  const inviteInfo = [
    {
      name: "Ujjwal Jain",
      inviteStatus: "0",
    },
    {
      name: "Abc Xyz",
      inviteStatus: "1",
    },
    {
      name: "Qwerty Asdfg",
      inviteStatus: "2",
    },
    {
      name: "Qwerty Uiop",
      inviteStatus: "0",
    },
    {
      name: "Qwedjkhdas jsklad",
      inviteStatus: "2",
    },
    {
      name: "dsja m,asdn",
      inviteStatus: "1",
    },
  ];
  const classes = useStyles();
  const [newData, setNewData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [userValue, setUserValue] = useState();
  const [communityValue, setCommunityValue] = useState("");
  const [valueState, setValueState] = useState("");
  const [inviteError, setInviteError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const GetUserData = async () => {
    await axios
      .post(`${ApiRequest}/api/user/allUsers`, { email: "reddit@gmail.com" })
      .then((response) => {
        setNewData(response.data);
      });
  };
  const GetCommunityData = async () => {
    await axios
      .post(`${ApiRequest}/api/community/ownerCommunities`, {
        email: "bhagi@gmail.com",
      })
      .then((response) => {
        if (response.status === 200) {
          setCommunityData(response.data);
        } else {
          setCommunityData(null);
        }
      });
  };
  const getSentInvites = async () =>{

  }
  useEffect(() => {
    GetUserData();
    GetCommunityData();
    console.log(newData);
  }, []);

  const handleInvites = async () => {
    if (communityValue && userValue.length > 0) {
      // Backend call to send invite to the users returned in userValue.
      await axios
        .post(`${ApiRequest}/api/invites/invite_user`, {
          users: userValue,
          community: communityValue,
          status:"invite"
        })
        .then((response) => {
          if (response.status === 200) {
            setValueState("");
            console.log(response.data.message);
            const close = document.getElementsByClassName(
              "MuiAutocomplete-clearIndicator"
            )[0];
            const close2 = document.getElementsByClassName(
              "MuiAutocomplete-clearIndicator"
            )[1];
            close.click();
            close2.click();
            setInviteError(false);
          } else {
            //Error on request.
            console.log(response.data.message)
            setErrorText(response.data.message);
            setInviteError(true);
          }
        });
    } else {
      //Error condition
      setErrorText("Please select a value in both the fields.");
      setInviteError(true);
    }
  };

  const handleClose = () => {
    setInviteError(false);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h5" component="h2" className={classes.pageTitle}>
          Invites
        </Typography>
      </Paper>
      {inviteError && (
        <ErrorDialog
          open={inviteError}
          text={errorText}
          handleClose={handleClose}
        />
      )}
      {communityData && (
        <Paper className={classes.body} elevation={0}>
          <Typography variant="h5" component="h2" className={classes.subtitle}>
            Send Invite
          </Typography>
          <Divider />
          <Grid
            container
            // spacing={2}
            direction="row"
            justify="center"
            alignItems="flex-start"
            className={classes.formRow}
          >
            <Grid item xs>
              <Autocomplete
                multiple
                id="UserSelection"
                options={newData}
                inputValue={valueState}
                // getOptionSelected={(option, value) =>
                //   option.username === value.username
                // }
                onChange={(event, newInputValue) => {
                  setUserValue(newInputValue);
                }}
                getOptionLabel={(option) => option.username}
                style={{ width: "80%", paddingTop: 10 }}
                renderInput={(params) => (
                  <TextField {...params} label="User" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                id="CommunitySelection"
                options={communityData}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                onChange={(event, newInputValue) => {
                  setCommunityValue(newInputValue);
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: "80%", paddingTop: 10 }}
                renderInput={(params) => (
                  <TextField {...params} label="Community" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleInvites}
              >
                Send Invites
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2" className={classes.subtitle}>
            Invites Sent
          </Typography>
          <Divider />
          <Grid container direction="column">
            {inviteInfo.map((invite, index) => (
              <Grid item className={classes.inviteLists} key={index}>
                <span className={classes.invite}>{invite.name}</span>{" "}
                <span className={classes.inviteButton}>
                  {invite.inviteStatus === "0"
                    ? "Pending"
                    : invite.inviteStatus === "1"
                    ? "Accepted"
                    : "Rejected"}
                </span>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      <Paper className={classes.body} elevation={0}>
        <Typography variant="h5" component="h2" className={classes.subtitle}>
          My pending invites
        </Typography>
        <Divider />
      </Paper>
    </div>
  );
}
