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

const ShowComments = ({ postId }) => {
  console.log("post id: "+postId);
  const classes = usePostCommentsStyles();
  const[isUpvoted, setIsUpvoted] = useState(false);
  const[isDownvoted, setIsDownvoted] = useState(false);
  const[replies,setReplies] = useState([]);
  const[parentComment, setParentComment] = useState("");
  const[comments,setComments] = useState([]);
  const[replyComm, setReplyComm] = useState("");
  const[replyToReply, setReplyToReply] = useState("");
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const handleCommentUpvote = async (commentId) => {
    
  };

  const handleCommentDownvote = async (commentId) => {
    
  };

  useEffect(() =>{
    const onLoadShowComments = async() =>{
        //show comments for post
        const headers = {
          'Content-Type': 'application/json' ,
          'Authorization': token
      }
          const body = {
            'postId':postId,
            'email':userLocalStorage.email
         }
         const response = await axios.post('http://localhost:3001/api/comment/getComments',body,{
          headers: headers
        });
        if(response.status===200){
          console.log("Response from get post: "+JSON.stringify(response.data));
          setComments(response.data);
          //setReplies(response.data[0].replies[0].replies);
          console.log("Replies: "+JSON.stringify(response.data[0].replies[0].replies));
          setParentComment(response.data[0].comment);
        }
    }
    onLoadShowComments();
},[]);

  // const replyDetails = (r) => {
  //     for(var i=0;i<r.length;i++){
  //         //  <p>r[i].comment</p>
  //          setReplyComm(r[i].comment)
  //       if(r[i].replies.length){
  //           return(
  //               <p>{r[i].replies}</p>
  //           )
  //       }
  //     }
  // };

  console.log("comments2 "+ JSON.stringify(comments));
  return (
    <div className={classes.commentsContainer}>
      {comments.length !== 0 ? (
        comments.map((c) => (
        <div className={classes.wholeComment}>
        <div className={classes.commentWrapper}>
        <div className={classes.commentVotesWrapper}>
        <Checkbox
        // checked={posts.upvotedBy.includes(user._id)}
        icon={<ArrowUpwardRoundedIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowUpwardRoundedIcon style={{ color: '#FF8b60' }} />}
        onChange={handleCommentUpvote}
        size={'small'}
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
          {/* {pointsCount} */}
        </Typography>
            <Checkbox
            // checked={posts.downvotedBy.includes(user.id)}
            icon={<ArrowDownwardRoundedIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowDownwardRoundedIcon style={{ color: '#9494FF' }} />}
            onChange={handleCommentDownvote}
            size={'small'}
            />
        </div>

        {/* parent comment display */}

        <div className={classes.commentDetails}>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${c.comment.commentedBy}`}>
            {c.comment.commentedBy}
          </Link>
          {` ${c.comment.pointsCount} ${
            c.comment.pointsCount === 1 ? 'point' : 'points'
          } • `}
          <TimeAgo datetime={new Date(c.comment.created_at)} />
          {c.comment.created_at !== c.updated_at && (
            <em>
              {' • edited'} <TimeAgo datetime={new Date(c.comment.updated_at)} />
            </em>
          )}
        </Typography>
        {/* <CommentActions
        comment={c}
        postId={postId}
        /> */}
        {c.comment.commentBody}
        </div>

        {/* display replies */}

        {/* {c.replies.map((r)=>
        <div className={classes.replyWrapper}>
        <div className={classes.commentDetails}>
                  {replyDetails(r,c)}            
        </div>
        </div>
        )} */}
        
        {/* {c.replies.length !== 0 ? (
            c.replies.map(r => {
             {replyDetails(c.replies)}
             <p>{replyComm}</p>
            })
        ):(
            <p>no replies</p>
        )} */}
        </div>
    </div>
    ))
    ): (
        <div className={classes.noCommentsBanner}>
          <ForumIcon color="primary" fontSize="large" />
          <Typography variant="h5" color="secondary">
            No Comments Yet
          </Typography>
          <Typography variant="h6" color="secondary">
            Be the first to share what you think!
          </Typography>
        </div>
    )}
    </div>
  );
};

export default ShowComments;
