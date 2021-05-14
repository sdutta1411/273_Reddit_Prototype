import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import img from "../../images/BMWm5.jpg";
import Apirequest from "../../backendRequestApi";
import axios from "axios";
import { Grid } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CreateCommunity } from "./CreateCommunity";
import Switch from '@material-ui/core/Switch';
import TablePagination from "@material-ui/core/TablePagination";
import { EditCommunity } from "./EditCommunity";



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}));

export const MyCommunity = () => {
  const classes = useStyles();

  const [communities, setCommunities] = useState([]);
  const [sort, setSort] = useState(10);
  const [sorted , setSorted] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const toggleChecked = () => {
    setSorted((prev) => !prev);
  };
  

  useEffect(() => {
    getallCommunities();
  }, [sort, sorted]);

  const getallCommunities = () => {
    // const email = localStorage.getItem("email");
    const email = { email: "bhagi@gmail.com", sorted: sorted , type: sort };

    axios.defaults.withCredentials = true;
    axios
      .post(`${Apirequest}/api/community/getAllOwnerCommunities`, email)
      .then(({ data }) => {
        console.log(data);
        setCommunities(data);
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };

  const deletecommunity = (communityID) => {
    // const email = localStorage.getItem("email");
    const deleteCommunity = { CommunityID: communityID};
console.log("Community id",deleteCommunity)
    axios.defaults.withCredentials = true;
    axios
      .post(`${Apirequest}/api/community/deleteCommunity`, deleteCommunity)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };


  return (
    <div>
      
      <h3>My Communities</h3>
     <CreateCommunity/>
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
          <MenuItem value={10}>Date</MenuItem>
          <MenuItem value={20}>Posts</MenuItem>
          <MenuItem value={30}>Users</MenuItem>
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
      <br/>
      {communities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((community) => (
        
        <Grid
        container
        key= {community._id}
        // spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.formRow}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={img}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {community.communityName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {community.description}
              </Typography>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
               Number of Users : {community.subscribedBy.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Number of Posts : {community.posts.length}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions> 
          <EditCommunity communityID={community._id}/>
            <Button size="small" color="primary" onClick={()=>deletecommunity(community._id)}>
              Delete
            </Button>
            </CardActions>
        </Card>
        </Grid>
      ))}
      <Grid
      container
      // spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.formRow}
    >
      <TablePagination
      rowsPerPageOptions={[2, 5, 10]}
      component="div"
      count={communities.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    </Grid>
    </div>
  );
};
