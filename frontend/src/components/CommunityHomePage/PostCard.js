import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import getEditedThumbail from '../../utils/cloudinaryTransform';
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import TimeAgo from 'timeago-react';
import axios from 'axios';

import {
  Paper,
  Typography,
  useMediaQuery,
  CardMedia,
  Link,
  Button,
} from '@material-ui/core';
import { useCardStyles } from '../../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';
import LinkIcon from '@material-ui/icons/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';

const PostCard = ({ post,user, toggleUpvote, toggleDownvote }) => {
  const {
    id,
    title,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
    communityName,
    author,
    upvotedBy,
    downvotedBy,
    pointsCount,
    commentCount,
    createdAt,
    updatedAt,
  } = post;

  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  //const userid = userLocalStorage.
  const classes = useCardStyles();
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = userLocalStorage.token;
  const isUpvoted =  upvotedBy.includes(user.id);
  const isDownvoted = downvotedBy.includes(user.id);
  const requestOptions = {
    method: 'POST',
   headers: { 'Content-Type': 'application/json' ,'Authorization': token},
  }
  const handleUpvoteToggle = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/posts/upvote",requestOptions)
    } catch (err) {
      console.log("Error: "+err);
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/posts/downvote",requestOptions)
    } catch (err) {
      console.log("Error: "+err);
    }
  };

  const linkToShow =
    postType === 'Link'
      ? linkSubmission
      : postType === 'Image'
      ? imageSubmission.imageLink
      : '';

  const formattedLink = trimLink(prettifyLink(linkToShow), 30);

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.votesWrapper}>
        <UpvoteButton
          user={user}
          body={post}
          handleUpvote={handleUpvoteToggle}
        />
        <Typography
          variant="body1"
          style={{
            color: isUpvoted
              ? '#FF8b60'
              : isDownvoted
              ? '#9494FF'
              : '#333',
            fontWeight: 600,
          }}
        >
          {pointsCount}
        </Typography>
        <DownvoteButton
          user={user}
          body={post}
          handleDownvote={handleDownvoteToggle}
        />
      </div>
      <div className={classes.thumbnailWrapper}>
        {postType === 'Text' ? (
          <RouterLink to={`/comments/${id}`}>
            <Paper elevation={0} square className={classes.thumbnail}>
              <MessageIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
          </RouterLink>
        ) : postType === 'Link' ? (
          <a href={fixUrl(linkSubmission)} target="_noblank">
            <Paper elevation={0} square className={classes.thumbnail}>
              <LinkIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
          </a>
        ) : (
          <Paper elevation={0} square className={classes.thumbnail}>
            <CardMedia
              className={classes.thumbnail}
              image={getEditedThumbail(imageSubmission)}
              title={title}
              component="a"
              href={imageSubmission}
              target="_noblank"
            />
          </Paper>
        )}
      </div>
      <div className={classes.postInfoWrapper}>
        <Typography variant="h6" className={classes.title}>
          {title}{' '}
          <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                postType === 'Link'
                  ? fixUrl(linkSubmission)
                  : postType === 'Image'
                  ? imageSubmission
                  : ''
              }
            >
              {formattedLink}
              {postType === 'Text' ? null : (
                <OpenInNewIcon fontSize="inherit" />
              )}
            </Link>
          </Typography>
        </Typography>
        <Typography variant="subtitle2">
          {/* <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            r/{subreddit.subredditName}
          </Link> */}
          <Typography variant="caption" className={classes.userAndDate}>
            Posted by{' '}
            <Link component={RouterLink} to={`/u/${author.username}`}>
              u/{author.username}
            </Link>{' '}
            • <TimeAgo datetime={new Date(createdAt)} />
            {createdAt !== updatedAt && '*'}
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${id}`}
          >
            {commentCount} comments
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default PostCard;
