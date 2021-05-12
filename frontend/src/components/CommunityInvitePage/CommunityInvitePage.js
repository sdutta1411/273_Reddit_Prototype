import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InviteComponent from "./InviteComponent";
import Icon from "@material-ui/core/Icon";

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
}));

export default function CommunityInvitePage() {
  const UserData = [
    {
      name: "User 1",
      UserName: "user1@gmail.com",
      UserID: "240",
    },
    {
      name: "User 2",
      UserName: "user2@gmail.com",
      UserID: "138",
    },
    {
      name: "User 3",
      UserName: "user3@gmail.com",
      UserID: "800",
    },
    {
      name: "User 4",
      UserName: "user4@gmail.com",
      UserID: "908",
    },
    {
      name: "User 5",
      UserName: "user5@gmail.com",
      UserID: "540",
    },
    {
      name: "User 6",
      UserName: "user6@gmail.com",
      UserID: "380",
    },
    {
      name: "User 7",
      UserName: "user7@gmail.com",
      UserID: "430",
    },
    {
      name: "User 8",
      UserName: "user8@gmail.com",
      UserID: "40",
    },
  ];

  const CommunityData = [
    {
      name: "page 1",
      CommunityID: "Demo",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 2",
      CommunityID: "Demo2",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 3",
      CommunityID: "Demo3",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 4",
      CommunityID: "Demo4",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 5",
      CommunityID: "Demo5",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 6",
      CommunityID: "Demo6",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 7",
      CommunityID: "Demo7",
      CommunityOwner: "Ujjwal",
    },
    {
      name: "page 8",
      CommunityID: "Demo8",
      CommunityOwner: "Ujjwal",
    },
  ];

  const handleUserChange = (e) => {
    let id = e.target.value;
    if (id.length > 0) {
      console.log(UserData[id].UserID);
      console.log(e.target.value);
    }
  };

  const handleCommunityChange = (e) => {
    let id = e.target.value;
    if (id.length > 0) {
      console.log(CommunityData[id].CommunityID);
      console.log(e.target.value);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.pageTitle}>
        Community Invite
      </Typography>
      <Paper className={classes.body} elevation={0}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Send Invite
        </Typography>
        <Grid
          container
          // spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.formRow}
        >
          <Grid item xs={3}>
            <InviteComponent
              type="User"
              data={UserData}
              classes={classes}
              changeHandler={handleUserChange}
            />
          </Grid>
          <Grid item xs={3}>
            <InviteComponent
              type="Community"
              data={CommunityData}
              classes={classes}
              changeHandler={handleCommunityChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Send Invites
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h2" className={classes.subtitle}>
            Active Invites
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}
