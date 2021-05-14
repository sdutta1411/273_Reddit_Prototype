import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from 'react-router-dom';
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
import { Checkbox, Container, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import LinkIcon from "@material-ui/icons/Link";
import UserList from "./UserList"

export default function Moderation() {

  // taken from dashboard.js
 const useCardStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      width: 'auto',
      borderRadius: 0,
    },
    cardRoot: {
      maxWidth: 1000,
      marginLeft: 150,
      marginTop: 50,
    },
    paperModal: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    votesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: 30,
      alignItems: 'center',
      backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
    },
    thumbnailWrapper: {
      alignSelf: 'center',
      marginLeft: 5,
    },
    thumbnail: {
      fontSize: '2em',
      width: 70,
      height: 90,
      textAlign: 'center',
      backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
      borderRadius: 8,
      [theme.breakpoints.down('xs')]: {
        width: 60,
        height: 80,
      },
    },
    thumbnailIcon: {
      marginTop: 30,
    },
    postInfoWrapper: {
      padding: 10,
      paddingBottom: 0,
    },
    userAndDate: {
      marginLeft: 10,
    },
    commentsBtn: {
      textTransform: 'none',
      color: theme.palette.type === 'light' ? '#787878' : '#dadada',
    },
    title: {
      marginRight: 5,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em',
        margin: 0,
      },
    },
    bottomBtns: {
      display: 'flex',
    },
  }),
  { index: 1 }
);

  const classes = useCardStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const myCommunities = [
    {
      title: "Comm1",
      userrequest:"",
      community: "TestCommunity1",
      upvotedBy: 19,
      downvotedBy: 10,
    },
    {
      title: "Comm2",
      userrequest:"",
      community: "TestCommunity2",
      upvotedBy: 12,
      downvotedBy:9,
    },
  ];

  
  return (
    <Paper className={classes.root} variant="outlined">
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <h1>Mod tools</h1>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CardContent>
                {myCommunities.map((value) => {
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
                              {value.upvotedBy - value.downvotedBy}
                            </Typography>
                            <Checkbox
                              icon={
                                <ArrowDownwardIcon
                                  style={{ color: "#b2b2b2" }}
                                />
                              }
                              checkedIcon={
                                <ArrowDownwardIcon
                                  style={{ color: "#9494FF" }}
                                />
                              }
                              size="small"
                            />
                          </div>
                          </ListItemAvatar>
                          <ListItemAvatar>
                          <div className={classes.thumbnailWrapper}>
                            {value.postType === "Text" ? (
                              <Link
                              
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
                            ) : value.postType === "LinkText" ? (
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
                        <ListItemText
                          primary={value.title}
                          secondary={value.community}
                        />
                        <ListItemText
                          primary={value.author}
                          secondary={value.amount}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CommentIcon />}
                          component={Link}
                        
                        />
                        <Button component={ Link } to="/UserList"  variant="contained" size="small" >Details</Button>
                        
                      
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
    </Paper>
  );
}
