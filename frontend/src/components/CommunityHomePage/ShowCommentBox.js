import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import TimeAgo from 'timeago-react';
import {useEffect ,useState,setState} from 'react'
import { Typography, Link, Checkbox } from '@material-ui/core';
import { usePostCommentsStyles } from '../../styles/muiStyles';
import ForumIcon from '@material-ui/icons/Forum';
import CommentActions from './CommentActions';
import ReplyActions from './ReplyActions';
import axios from 'axios';

const getVoteCount = (upvotedBy, downvotedBy) => {
  const totalCount = upvotedBy.length + downvotedBy.length;
  return totalCount;
}

const ShowCommentBox = (props) => {
  const [voteCount, setVoteCount] = useState(getVoteCount(props.c.comment.upvotedBy, props.c.comment.downvotedBy))
  const [checkedUp, setCheckUp] = useState(props.c.comment.upvotedBy.includes(props.userId));
  const [checkedDown, setCheckDown] = useState(props.c.comment.downvotedBy.includes(props.userId));
  const handleCommentVote = (event, commentId, voteType) => {
    if (voteType === -1 && !checkedDown) {
      props.handleCommentVote(commentId, -1)
      setVoteCount(voteCount-1);
      setCheckDown(true)
      setCheckUp(false)
    }
    if (voteType === -1 && checkedDown) {
      props.handleCommentVote(commentId, 0)
      setVoteCount(voteCount+1);
      setCheckDown(false)
      setCheckUp(false)
    }
    if (voteType === 1 && !checkedUp) {
      props.handleCommentVote(commentId, 1)
      setVoteCount(voteCount+1);
      setCheckUp(true)
      setCheckDown(false)
    }
    if (voteType === 1 && checkedUp) {
      props.handleCommentVote(commentId, 0)
      setVoteCount(voteCount-1);
      setCheckUp(false)
      setCheckDown(false)
    }
  }
  return (
        <div className={props.classes.wholeComment} style={{marginLeft: `${props.indentationVal*15}px`}}>
        <div className={props.classes.commentWrapper}>
        <div className={props.classes.commentVotesWrapper}>
        <div>{voteCount}</div>  
        <Checkbox
        checked={checkedUp}
        icon={<ArrowUpwardRoundedIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowUpwardRoundedIcon style={{ color: '#FF8b60' }} />}
        onChange={(e) => handleCommentVote(e, props.c.comment._id, 1)}
        size={'small'}
        />
        <Typography
          variant="body1"
          style={{
            color: props.isUpvoted
              ? '#FF8b60'
              : props.isDownvoted
              ? '#9494FF'
              : '#333',
            fontWeight: 600,
          }}
        >
        </Typography>
            <Checkbox
            checked={checkedDown}
            icon={<ArrowDownwardRoundedIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowDownwardRoundedIcon style={{ color: 'red' }} />}
            onChange={(e) => handleCommentVote(e, props.c.comment._id, -1)}
            size={'small'}
            />
        </div>

        <div className={props.classes.commentDetails}>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${props.c.comment.commentedBy}`}>
            {props.c.comment.commentedBy}
          </Link>
          <TimeAgo datetime={new Date(props.c.comment.created_at)} />
          {props.c.comment.created_at !== props.c.updated_at && (
            <em>
              {' • edited'} <TimeAgo datetime={new Date(props.c.comment.updated_at)} />
            </em>
          )}
        </Typography>
        {props.c.comment.commentBody}
        </div>

        </div>
    </div>
    )
}

export default ShowCommentBox;