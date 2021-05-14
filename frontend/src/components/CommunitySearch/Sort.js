import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Apirequest from "../../backendRequestApi";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

const Sort = (props) => {
  const classes = useStyles();
  
  const [sort, setSort] = useState(10);
  const [sorted , setSorted] = useState(false)
  
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const toggleChecked = () => {
    setSorted((prev) => !prev);
  };
  
  
  return (
    <div>
      <Grid
      container
      // spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.formRow}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={10}>Created At</MenuItem>
          <MenuItem value={20}>Posts</MenuItem>
          <MenuItem value={30}>Users</MenuItem>
          <MenuItem value={40}>Upvotes</MenuItem>
        </Select>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Descending</Grid>
          <Grid item>
          <FormControlLabel
          control={<Switch checked={sorted} onChange={toggleChecked}  color="primary"/>}
        />          </Grid>
          <Grid item>Ascending</Grid>
        </Grid>
      </Typography>
     

      </FormControl>
     
     </Grid>
      
    
    </div>
  );
};


 
export default Sort;