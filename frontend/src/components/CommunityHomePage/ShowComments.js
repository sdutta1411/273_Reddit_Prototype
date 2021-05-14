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
import ShowCommentBox from './ShowCommentBox';

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
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  console.log("USERID: "+userId);
  const handleCommentVote = async (commentId, voteType) => {
    console.log(commentId, voteType)
    return
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
          //console.log("Replies: "+JSON.stringify(response.data[0].replies[0].replies));
          //setParentComment(response.data[0].comment);
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

  let start = [];
  const createShowCommentBox = (classes, isDownvoted, isUpvoted, c, count) => {
      start.push(<ShowCommentBox classes={classes} isDownvoted={isDownvoted}
         isUpvoted={isUpvoted} c={c} indentationVal={count}
         handleCommentVote={handleCommentVote} userId={userId}></ShowCommentBox>)
      if (c.replies.length>0) {
        c.replies.map((c1) => (
            createShowCommentBox(classes, c1.isDownvoted, c1.isUpvoted, c1, count+1)
        ))
      }
  }
  comments.map((comment) => {
    createShowCommentBox(classes, isDownvoted, isUpvoted, comment, 0);
  });
  console.log("comments2 "+ JSON.stringify(comments));
  console.log(start);
  return (
    <div className={classes.commentsContainer}>
      {comments.length !== 0 ? (
        start.map((s) => {
          return s;
        })
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
