import React from 'react';
import { Checkbox } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export const UpvoteButton = ({ user, body, handleUpvote }) => {
  return user (
    <Checkbox
      checked={body.upvotedBy.includes(user.id)}
      icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />}
      checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />}
      onChange={handleUpvote}
      size={'small'}
    />
  )
};

export const DownvoteButton = ({ user, body, handleDownvote }) => {
  return user(
    <Checkbox
      checked={body.downvotedBy.includes(user.id)}
      icon={<ArrowDownwardIcon style={{ color: '#b2b2b2' }} />}
      checkedIcon={<ArrowDownwardIcon style={{ color: '#9494FF' }} />}
      onChange={handleDownvote}
      size={'small'}
    />
  ) 
};
