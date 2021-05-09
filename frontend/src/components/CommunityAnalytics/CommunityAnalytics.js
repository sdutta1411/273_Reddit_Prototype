import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import RedditIcon from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import img from "../../images/Reddit.png";
import GraphCard from "./DataCard"
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

export default function CommunityAnalytics() {
    const data = [
        {
          name: "page 1",
          UserCount: 4000,
          PostCount: 2400,
          ActiveUser: "2400",
          BestPost: "URL TO POST",
        },
        {
          name: "page 2",
          UserCount: 3000,
          PostCount: 1398,
          ActiveUser: "2210",
          BestPost: "URL TO POST",
        },
        {
          name: "page 3",
          UserCount: 2000,
          PostCount: 9800,
          ActiveUser: "2290",
          BestPost: "URL TO POST",
        },
        {
          name: "page 4",
          UserCount: 2780,
          PostCount: 3908,
          ActiveUser: "2000",
          BestPost: "URL TO POST",
        },
        {
          name: "page 5",
          UserCount: 1890,
          PostCount: 4800,
          ActiveUser: "2181",
          BestPost: "URL TO POST",
        },
        {
          name: "page 6",
          UserCount: 2390,
          PostCount: 3800,
          ActiveUser: "2500",
          BestPost: "URL TO POST",
        },
        {
          name: "page 7",
          UserCount: 3490,
          PostCount: 4300,
          ActiveUser: "2100",
          BestPost: "URL TO POST",
        },
      ];
  const classes = useStyles();
  return (
    <div>
      <GraphCard text="Number Of Posts Per Community" data={data} x_key="PostCount" bar_color = "#82ca9d"/>
      <GraphCard text="Number Of Users Per Community" data={data} x_key="UserCount" bar_color = "#c882ca"/>
    </div>
  );
}
