import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import {
  Button,
  ListItemText,
  ListItemAvatar,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";
import backendUrl from "../../backendUrl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(400),
      height: theme.spacing(300),
    },
    userTitle: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    listClass: {
      width: "50%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  },
}));

export default function ChatList() {
  const classes = useStyles();

  useEffect(() => {
    getAllChats();
  }, []);

  const getAllChats = () => {
    debugger;
    axios
      .post(`${backendUrl}/api/message/initiatechat`, {
        users: "pavan@gmail.com",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const users = [
    {
      username: "Shubham Dutta",
      email: "shubham@gmail.com",
    },

    {
      username: "Ujjwal Jain",
      email: "ujjwal@gmail.com",
    },
    {
      username: "Pavan Bhatt",
      email: "pavan@gmail.com",
    },
    {
      username: "Saumil Shah",
      email: "saumil@gmail.com",
    },
  ];

  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <Grid item xs={12} style={{ textAlign: "center", marginTop: 50 }}>
          <Typography
            variant="h2"
            gutterBottom
            style={{ color: "#f47b4e", textAlign: "center" }}
          >
            Initiate Chat
          </Typography>
        </Grid>

        <Autocomplete
          id="combo-box-demo"
          options={users}
          getOptionLabel={(option) => option.username}
          style={{ width: 200, marginLeft: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Users" variant="outlined" />
          )}
        />
        <Grid item xs={12} style={{ marginTop: 10, marginLeft: 200 }}>
          <Button variant="contained" color="primary">
            Chat
          </Button>
        </Grid>
      </Paper>
      <Paper variant="outlined">
        {users.map((value) => {
          return (
            <List className={classes.listClass}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={value.username}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                      <Button
                        color="primary"
                        size="medium"
                        startIcon={<ChatIcon />}
                        component={Link}
                        to={`/chats/${123}/${value.username}`}
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        })}
      </Paper>
    </div>
  );
}
