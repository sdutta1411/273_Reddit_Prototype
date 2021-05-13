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
  const xdata = [
    {
      name: "page 1",
      UserCount: 3960,
      PostCount: 240,
      ActiveUser: "2400",
      UserPostCount: 9,
      BestPost: "URL TO POST",
    },
    {
      name: "page 2",
      UserCount: 3000,
      PostCount: 138,
      ActiveUser: "2210",
      UserPostCount: 10,
      BestPost: "URL TO POST",
    },
    {
      name: "page 3",
      UserCount: 2000,
      PostCount: 800,
      ActiveUser: "2290",
      UserPostCount: 19,
      BestPost: "URL TO POST",
    },
    {
      name: "page 4",
      UserCount: 2780,
      PostCount: 908,
      ActiveUser: "2000",
      UserPostCount: 29,
      BestPost: "URL TO POST",
    },
    {
      name: "page 5",
      UserCount: 1890,
      PostCount: 540,
      ActiveUser: "2181",
      UserPostCount: 12,
      BestPost: "URL TO POST",
    },
    {
      name: "page 6",
      UserCount: 2390,
      PostCount: 380,
      ActiveUser: "2500",
      UserPostCount: 15,
      BestPost: "URL TO POST",
    },
    {
      name: "page 7",
      UserCount: 3490,
      PostCount: 430,
      ActiveUser: "2100",
      UserPostCount: 28,
      BestPost: "URL TO POST",
    },
    {
      name: "page 8",
      UserCount: 490,
      PostCount: 40,
      ActiveUser: "2100",
      UserPostCount: 82,
      BestPost: "URL TO POST",
    },
  ];
  const userTableData = [
    {
      name: "page 1",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 2",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 3",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 4",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 5",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 6",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 7",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
    {
      name: "page 8",
      ActiveUser: "Ujjwal",
      UserPostCount: 19,
    },
  ];

  const communityTableDatax = [
    {
      name: "page 1",
      title: "Demo",
      Author: "Ujjwal",
      Votes: 1,
    },
    {
      name: "page 2",
      title: "Demo2",
      Author: "Ujjwal",
      Votes: 312,
    },
    {
      name: "page 3",
      title: "Demo3",
      Author: "Ujjwal",
      Votes: 101,
    },
    {
      name: "page 4",
      title: "Demo4",
      Author: "Ujjwal",
      Votes: 10,
    },
    {
      name: "page 5",
      title: "Demo5",
      Author: "Ujjwal",
      Votes: 12,
    },
    {
      name: "page 6",
      title: "Demo6",
      Author: "Ujjwal",
      Votes: 112,
    },
    {
      name: "page 7",
      title: "Demo7",
      Author: "Ujjwal",
      Votes: 102,
    },
    {
      name: "page 8",
      title: "Demo8",
      Author: "Ujjwal",
      Votes: 101,
    },
  ];
  const [data, setData] = useState()
  const [communityTableData, setCommunityTableData] = useState([])
  const getData = async () => {
    await axios
      .post(`${ApiRequest}/api/community/fetchAnalyticsData`, {
        email: "bhagi@gmail.com",
      })
      .then((response) => {
        console.log(response)
        setData(response.data.data);
        setCommunityTableData(response.data.communityTableData)
      });
  };
  useEffect(() => {
    getData();
  },[]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Community Analytics
      </Typography>
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
    </div>
  );
}
