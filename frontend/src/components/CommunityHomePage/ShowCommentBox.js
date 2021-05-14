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

const ShowCommentBox = (props) => {
    return (
        <div className={props.classes.wholeComment} style={{marginLeft: `${props.indentationVal*15}px`}}>
        <div className={props.classes.commentWrapper}>
        <div className={props.classes.commentVotesWrapper}>
        <Checkbox
        // checked={posts.upvotedBy.includes(user._id)}
        icon={<ArrowUpwardRoundedIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowUpwardRoundedIcon style={{ color: '#FF8b60' }} />}
        // onChange={handleCommentUpvote}
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
            icon={<ArrowDownwardRoundedIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowDownwardRoundedIcon style={{ color: '#9494FF' }} />}
            // onChange={handleCommentDownvote}
            size={'small'}
            />
        </div>

        <div className={props.classes.commentDetails}>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${props.c.comment.commentedBy}`}>
            {props.c.comment.commentedBy}
          </Link>
          {` ${props.c.comment.pointsCount} ${
            props.c.comment.pointsCount === 1 ? 'point' : 'points'
          } • `}
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