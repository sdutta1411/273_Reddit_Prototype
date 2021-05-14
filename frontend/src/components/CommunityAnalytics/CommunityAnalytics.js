import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GraphCard from "./DataCard";
import TextCard from "./TextCard";
import ApiRequest from "../../backendRequestApi";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    // display: "flex",
  },
  title: {
    fontSize: "30px",
    marginTop: "1%",
    marginLeft: "3%",
  },
  formRow: {
    // marginLeft: "1%",
    overflowX: "auto",
  },
}));

export default function CommunityAnalytics() {   
  const [data, setData] = useState();
  const [communityTableData, setCommunityTableData] = useState([]);
  const [userTableData, setUserTableData] = useState([]);
  /////////////////////////////////////////////////
  // Check local storage token
  /////////////////////////////////////////////////
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = userLocalStorage ? userLocalStorage.token : "";
  const email = userLocalStorage ? userLocalStorage.email : "baghi@gmail.com";
  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
  };
  const getData = async () => {
    await axios
      .post(
        `${ApiRequest}/api/community/fetchAnalyticsData`,
        {
          email: email,
        },
        requestOptions
      )
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
          setCommunityTableData(response.data.communityTableData);
          setUserTableData(response.data.userTableData);
        } else {
          setData(null);
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Community Analytics
      </Typography>
      {data ? (
        <span>
          <Grid
            container
            // spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.formRow}
          >
            <Grid item xs zeroMinWidth>
              <GraphCard
                text="Number Of Posts Per Community"
                data={data}
                x_key="PostCount"
                bar_color="#82ca9d"
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <GraphCard
                text="Number Of Users Per Community"
                data={data}
                x_key="UserCount"
                bar_color="#c882ca"
              />
            </Grid>
          </Grid>
          <Grid
            container
            // spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.formRow}
          >
            <Grid item xs zeroMinWidth>
              <TextCard
                text="Most Active User Per Community"
                data={userTableData}
                tableHead={["Community", "User", "Number Of Posts"]}
                bar_color="#82ca9d"
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <TextCard
                text="Most Popular Post Per Community"
                data={communityTableData}
                tableHead={["Community", "Post Title", "Author", "Votes"]}
                bar_color="#c882ca"
              />
            </Grid>
          </Grid>
        </span>
      ) : (
        <Typography variant="h5" component="h4" style={{ marginLeft: "5%" }}>
          You are not an admin for any communities.
        </Typography>
      )}
    </div>
  );
}
