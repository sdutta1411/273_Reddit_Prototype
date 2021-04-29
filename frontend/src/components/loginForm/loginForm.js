import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {useStyles} from "../../constants/usestyle"
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <h1>Login</h1>
      <h1> Form</h1>
    </div>
  );
}
