import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {useStyles} from "../../constants/usestyle"
import CssBaseline from "@material-ui/core/CssBaseline";

export default function SignUp() {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <h1>sign up</h1>
      <h1> Form</h1>
    </div>
  );
}
