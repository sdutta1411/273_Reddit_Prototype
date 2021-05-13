import {
  FormControl,
  Grid,
  Select,
  InputLabel,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function InviteComponent(props) {
  return (
    <span className={props.classes.test}>
      <Typography
        variant="subtitle1"
        component="h4"
        className={props.classes.subtitle}
      >
        {props.type}:
      </Typography>
      <FormControl className={props.classes.formControl}>
        <InputLabel htmlFor="name_selector" className={props.classes.selectInput}>{props.type}</InputLabel>
        <Select
          native
          // value={state.age}
          onChange={props.changeHandler}
          inputProps={{
            name: props.type,
            id: "name_selector",
          }}
          className={props.classes.selectInput}
        >
          <option aria-label="None" value="" />
          {props.data.map((user, index) => (
            <option value={index} key={index}>
              {user.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </span>
  );
}
