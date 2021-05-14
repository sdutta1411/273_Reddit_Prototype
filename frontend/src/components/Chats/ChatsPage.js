import React, { Component } from "react";
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
import Avatar from "@material-ui/core/Avatar";

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

          {messages.map((message) => {
            return (
              <List component="nav">
                <ListItem className="container darker">
                  <Typography component="div">{message.chat}</Typography>
                </ListItem>
              </List>
            );
          })}
        </CardContent>
        <CardActions>
          <Input
            placeholder="Type your message"
            className={classes.input}
            inputProps="aria-label"
          />
          <Button size="small" color="primary" startIcon={<SendIcon />} />
        </CardActions>
      </Card>
    </div>
  );
}
