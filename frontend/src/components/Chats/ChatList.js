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

  const [myChats, setmyChats] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [startChatUser, setstartChatUser] = useState([]);

  useEffect(() => {
    getAllUsers();
    getAllChats();
  }, []);

  const formatChats = (allChats) => {
    let myChatsArr = [];
    for (let i = 0; i < allChats.length; i++) {
      let email = allChats[i].users.find(
        ({ email }) => email !== "pavan@gmail.com"
      );
      const chats = {
        chatId: allChats[i]._id,
        username: email.username,
        email: email.email,
      };
      myChatsArr = [...myChatsArr, chats];
    }
    setmyChats(myChatsArr);
  };

  const getAllUsers = async () => {
    debugger;
    await axios
      .post(`${backendUrl}/api/user/allUsers`, {
        users: "pavan@gmail.com",
      })
      .then((response) => {
        let AllUsers = response.data;
        setallUsers(AllUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllChats = () => {
    debugger;
    axios
      .post(`${backendUrl}/api/message/initiatechat`, {
        users: "pavan@gmail.com",
      })
      .then((response) => {
        const allChats = response.data.data;
        formatChats(allChats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startChat = () => {
    debugger;
    console.log(startChatUser);
    let email = startChatUser.email;
    let users = ["pavan@gmail.com", email];
    axios
      .post(`${backendUrl}/api/message/initiatechat`, {
        users: users,
      })
      .then((response) => {
        if (response.data.status == true) {
          swal("Chats Already Exist");
        } else {
          users = [
            {
              email: "pavan@gmail.com",
              username: "Pavan Bhatt",
            },
            {
              email: startChatUser.email,
              username: startChatUser.username,
            },
          ];
          axios
            .post(`${backendUrl}/api/message/postchat`, {
              users: users,
            })
            .then((response) => {
              getAllChats();
              swal("Chats Initiated...");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          options={allUsers}
          getOptionLabel={(option) => option.username}
          style={{ width: 200, marginLeft: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Users" variant="outlined" />
          )}
          onChange={(event, value) => {
            setstartChatUser(value);
          }}
        />
        <Grid item xs={12} style={{ marginTop: 10, marginLeft: 200 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => startChat(e)}
          >
            Chat
          </Button>
        </Grid>
      </Paper>
      <Paper variant="outlined">
        <Grid item xs={12} style={{ textAlign: "center", marginTop: 30 }}>
          <Typography
            variant="h2"
            gutterBottom
            style={{ color: "#f47b4e", textAlign: "center" }}
          >
            Existing Chats
          </Typography>
        </Grid>
        {myChats.map((value) => {
          return (
            <List className={classes.listClass}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={value.username}
                    src="/static/images/avatar/1.jpg"
                  />
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
                        {/* Ali Connors */}
                      </Typography>
                      {/* {" — I'll be in your neighborhood doing errands this…"} */}
                      <Button
                        color="primary"
                        size="medium"
                        startIcon={<ChatIcon />}
                        component={Link}
                        to={`/chats/${value.chatId}/${value.email}`}
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
