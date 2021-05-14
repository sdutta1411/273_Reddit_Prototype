import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, Grid, Paper } from "@material-ui/core";
import moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import backendUrl from "../../backendUrl";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "0 auto",
    float: "none",
    marginbottom: "10px",
  },
  openCard: {
    maxWidth: 200,
  },
  openMedia: {
    height: 80,
  },
  media: {
    objectFit: "cover",
  },
  container: {
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  timeRight: {
    float: "right",
    color: "#aaa",
  },
  darker: {
    borderColor: "#ccc",
    backgroundColor: "#ddd",
  },
}));

export default function ChatsPage() {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [allChats, setallChats] = useState([]);

  useEffect(() => {
    getAllChats();
  }, []);

  const chatId = location.pathname.split("/")[2];
  const email = location.pathname.split("/")[3];

  const messages = [
    {
      chat: "Hello Pavan",
      user: "Shubham Dutta",
      created_at: "13-05-2021",
    },
    {
      chat: "Hi Shubham..",
      user: "Pavan Bhatt",
      created_at: "13-05-2021",
    },
    {
      chat: "How are you??",
      user: "Pavan Bhatt",
      created_at: "13-05-2021",
    },
  ];

  const getAllChats = () => {
    let users = ["pavan@gmail.com", email];
    axios
      .post(`${backendUrl}/api/message/initiatechat`, {
        users: users,
      })
      .then((response) => {
        if (response.data.status == true) {
          setallChats(response.data.data[0].chats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postChat = () => {
    debugger;
    let data = {
      chatId: chatId,
      chats: {
        username: "Pavan Bhatt",
        chat: message,
      },
    };
    axios
      .post(`${backendUrl}/api/message/postchat`, data)
      .then((response) => {
        getAllChats();
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 70,
          left: 100,
          right: 0,
          bottom: 0,
        }}
      >
        <Link
          to={`/chatList`}
          style={{
            alignItems: "center",
            display: "flex",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Avatar className="Icon">
            <ArrowBackIcon fontSize="inherit" />
          </Avatar>
        </Link>
      </div>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Messages
          </Typography>

          {allChats.map((message) => {
            return (
              <Paper
                style={{
                  padding: "30px 10px",
                  marginTop: 30,
                  width: "400px",
                  height: "100px",
                }}
              >
                <Grid container wrap="wrap" spacing={2}>
                  <Grid item>
                    <Avatar
                      alt={message.username}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {message.username}
                    </h4>
                    <p style={{ textAlign: "left" }}>{message.chat}</p>
                    <p style={{ textAlign: "right", color: "gray" }}>
                      {moment(message.created_at).format("HH:MM")}
                    </p>
                  </Grid>
                  <Button className="mr10">X</Button>
                </Grid>
              </Paper>
            );
          })}
        </CardContent>
        <CardActions>
          <Input
            placeholder="Type your message"
            className={classes.input}
            inputProps="aria-label"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            size="small"
            color="primary"
            onClick={(e) => postChat(e)}
            startIcon={<SendIcon />}
          />
        </CardActions>
      </Card>
    </div>
  );
}
