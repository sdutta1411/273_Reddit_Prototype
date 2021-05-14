import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CommentIcon from "@material-ui/icons/Comment";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Divider, CardMedia } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useCardStyles } from "./DashboardStyles";
import { Checkbox, Container, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import LinkIcon from "@material-ui/icons/Link";
import axios from "axios";
import swal from "sweetalert";
import backendUrl from "../../backendUrl";

export default function DashboardPage() {
  const classes = useCardStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [myPosts, setmyPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const posts = [
    {
      title: "Test Link",
      postType: "Link",
      textSubmission: "",
      linkSubmission: "https://material-ui.com/components/grid/",
      imageSubmission: "",
      community: "TestCommunity1",
      author: "Shubham Dutta",
      upvotedBy: 2,
      downvotedBy: 3,
    },
    {
      title: "Text Post",
      postType: "Text",
      textSubmission: "Hello Shubham",
      linkSubmission: "",
      imageSubmission: "",
      community: "TestCommunity2",
      author: "Pavan Bhatt",
      upvotedBy: 4,
      downvotedBy: 3,
    },
  ];

  const formatPosts = (communities) => {
    debugger;
    let myPostsArr = [];
    for (let i = 0; i < communities.length; i++) {
      for (let j = 0; j < communities[i].posts.length; j++) {
        myPostsArr = [...myPostsArr, communities[i].posts[j]];
      }
    }
    setmyPosts(myPostsArr);
  };

  const getPosts = () => {
    debugger;
    axios
      .post(`${backendUrl}/api/community/getallcommunities_dashboard`, {
        email: "bhagi@gmail.com",
      })
      .then((response) => {
        formatPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <h1>Hey</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <h1>Top Communities</h1>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ width: "55rem" }}>
            <CardContent>
              {myPosts.map((value) => {
                return (
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <div className={classes.votesWrapper}>
                          <Checkbox
                            icon={
                              <ArrowUpwardIcon style={{ color: "#b2b2b2" }} />
                            }
                            checkedIcon={
                              <ArrowUpwardIcon style={{ color: "#FF8b60" }} />
                            }
                            size="small"
                          />
                          <Typography
                            variant="body1"
                            style={{
                              color: "#FF8b60",
                              fontWeight: 600,
                            }}
                          >
                            {value.pointsCount}
                          </Typography>
                          <Checkbox
                            icon={
                              <ArrowDownwardIcon style={{ color: "#b2b2b2" }} />
                            }
                            checkedIcon={
                              <ArrowDownwardIcon style={{ color: "#9494FF" }} />
                            }
                            size="small"
                          />
                        </div>
                      </ListItemAvatar>
                      <ListItemAvatar>
                        <div className={classes.thumbnailWrapper}>
                          {value.postType === "Text" ? (
                            <Link
                            // to={`/comments/${id}`}
                            >
                              <Paper
                                elevation={0}
                                square
                                className={classes.thumbnail}
                              >
                                <MessageIcon
                                  fontSize="inherit"
                                  className={classes.thumbnailIcon}
                                  style={{ color: "#787878" }}
                                />
                              </Paper>
                            </Link>
                          ) : value.postType === "Link" ? (
                            <a href={value.linkSubmission} target="_noblank">
                              <Paper
                                elevation={0}
                                square
                                className={classes.thumbnail}
                              >
                                <LinkIcon
                                  fontSize="inherit"
                                  className={classes.thumbnailIcon}
                                  style={{ color: "#787878" }}
                                />
                              </Paper>
                            </a>
                          ) : (
                            <Paper
                              elevation={0}
                              square
                              className={classes.thumbnail}
                            >
                              <CardMedia
                                className={classes.thumbnail}
                                image={value.imageSubmission}
                                title={value.title}
                                component="a"
                                href={value.imageSubmission}
                                target="_noblank"
                              />
                            </Paper>
                          )}
                        </div>
                      </ListItemAvatar>
                      <ListItemText primary={value.title} />
                      <ListItemText primary={value.author.username} />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CommentIcon />}
                        component={Link}
                        //to={`/commentpage/${value.group_name}/${value._id}`}
                      />
                    </ListItem>
                    <Divider />
                  </List>
                );
              })}
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
