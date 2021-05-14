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

import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  
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

const SearchBar = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [open, setOpen] = useState(false);
  const [communities,setCommunities] =useState([]);

    const handleOpen = () => {
        setOpen(true);

      };
    
      const handleClose = () => {
        setOpen(false);
      };
   
  const handleSearchChange = (e) => {
    setOpen(e.target.value);
  };

  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Community"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
    
      
      )
    </>
  );
};

export default SearchBar;