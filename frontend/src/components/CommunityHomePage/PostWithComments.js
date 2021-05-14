import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import { usePostCommentsStyles } from '../../styles/muiStyles';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import AboutCommunity from './AboutCommunity';
import Rules from './Rules';
import { Link as RouterLink } from 'react-router-dom';
import TimeAgo from 'timeago-react';
// import ReactHtmlParser from 'react-html-parser';
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';

import {
  Paper,
  Typography,
  useMediaQuery,
  CardMedia,
  Link,
  Button,
  Card,
  Checkbox,
  MenuItem,
  ListItemIcon,
  Divider
} from '@material-ui/core';
import ShowComments from './ShowComments';
import AddComment from './AddComment';

export default function PostWithComments(props) {
  console.log("commName: "+props.location.state);
    var  p = props.location.state.split(",");
    console.log("post._id-p[0]: "+p[0]+" communityName-p[1]: "+p[1]+" username-p[2]: "+p[2]);
    const classes = usePostCommentsStyles();
    const[isUpvoted, setIsUpvoted] = useState(false);
    const[isDownvoted, setIsDownvoted] = useState(false);
    const[postTitle, setPostTitle] = useState("");
    const[postDesc, setPostDesc] = useState("");
    const[postType,setPostType] = useState("");
    const[postAuth,setPostAuth] = useState("");
    const[postCreatedAt,setCreatedAt] = useState("");
    const[postUpdatedAt,setUpdatedAt] = useState("");
    const[textSubmission, setTextSubmission] = useState("");
    const[imageSubmission,setImageSubmission] = useState("");
    const[linkSubmission,setLinkSubmission] = useState("");
    const[commentCount, setCommentCount] = useState("");
    const[comments, setComments] = useState([]);
    // const[commHomePage, setCommHomePage] = useState(false);

    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    var communityName = 'Team11';

    const requestOptions = {
        method: 'GET',
       headers: { 'Content-Type': 'application/json' ,'Authorization': token},
      }

      useEffect(() =>{
        const onLoadPostWithComments = async() =>{

            //get posts of community
            const headers = {
              'Content-Type': 'application/json' ,
              'Authorization': token
          }
              const body = {
                'postId':p[0]
             }
             const response = await axios.post('http://localhost:3001/api/posts/getPost',body,{
              headers: headers
            });
            if(response.status===200){
              console.log("Response from get post: "+JSON.stringify(response.data.title));
              setPostTitle(response.data.title);
              setPostType(response.data.postType);
              setCreatedAt(response.data.created_at);
              setUpdatedAt(response.data.updated_at);
              setTextSubmission(response.data.textSubmission);
              setImageSubmission(response.data.textSubmission);
              setLinkSubmission(response.data.textSubmission);
              setCommentCount(response.data.comments.length);
              setComments(response.data.comments);
            }
            //get comments of the post             
            const cbody = {
              comments: comments
            }
            const commResponse = await axios.post('http://localhost:3001/api/comment/getComments',cbody,{
              headers: headers
            });
            if(response.status===200){
              console.log("Get Comments response: "+commResponse);
            }
        }
        onLoadPostWithComments();
    },[]);


    const handleUpvoteToggle = async () => {
        try {
          const response = await axios.post("http://localhost:3001/api/posts/upvote",requestOptions);
          if(response.status===200){
            setIsUpvoted(true);
          }
        } catch (err) {
          console.log("Error: "+err);
        }
      };
    
      const handleDownvoteToggle = async (e) => {
        try {
          const response = await axios.post("http://localhost:3001/api/posts/downvote",requestOptions);
          if(response.status===200){
            setIsDownvoted(true);
          }
        } catch (err) {
          console.log("Error: "+err);
        }
      };


    return (
        <>
        <br/><br/>
        <div style={{display:"flex"}}>
        <Card style={{marginLeft:"50px",width:"1000px"}}>
        <Paper style={{display:"flex"}}>
        <div className={classes.votesWrapper}>
        <Checkbox
        // checked={posts.upvotedBy.includes(user._id)}
        icon={<ArrowUpwardRoundedIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowUpwardRoundedIcon style={{ color: '#FF8b60' }} />}
        onChange={handleUpvoteToggle}
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
            onChange={handleDownvoteToggle}
            size={'small'}
            />
      </div>


      {/* <div className={classes.postInfoWrapper}>
      <Typography variant="h6" className={classes.title}>
          {postTitle}{' '} */}
          {/* <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                post.postType === 'Link'
                  ? fixUrl(post.linkSubmission)
                  : post.postType === 'Image'
                  ? post.imageSubmission
                  : ''
              }
            >
              {post.postType === 'Text' ? null : (
                <OpenInNewIcon fontSize="inherit" />
              )}
            </Link>
          </Typography> */}
        {/* </Typography>
      </div> */}

      {/* post details */}


         <div className={classes.postDetails}>
            <Typography variant="subtitle2">
              <Link style={{marginLeft:"2px"}} component={RouterLink} to={`/r/${p[1]}`}>
                {`r/${p[1]} `}
              </Link>
              <Typography variant="caption" className={classes.userAndDate}>
                • Posted by
                <Link component={RouterLink} to={`/u/${p[2]}`}>
                  {` u/${p[2]} `}
                </Link>
                • <TimeAgo datetime={new Date(postCreatedAt)} />
                {postCreatedAt !== postUpdatedAt && (
                  <em>
                    {' • edited'} <TimeAgo datetime={new Date(postUpdatedAt)} />
                  </em>
                )}
              </Typography>
              <br/><br/>
            </Typography>
            <Typography  variant="h5" className={classes.pctitle}>
              {postTitle}
            </Typography><br/><br/>
            {postType === 'Text' ? (
              <div style={{marginLeft:"14px"}}>{(textSubmission)}</div>
            ) : postType === 'Image' ? (
              {/* <a
                href={imageSubmission.imageLink}
                alt={title}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.imagePost}
              >
                <img
                  alt={title}
                  src={imageSubmission.imageLink}
                  className={classes.image}
                />
              </a> */}
            ) : (
              <Link href={fixUrl(linkSubmission)}>
                {/* {formattedLink}  */}
                <OpenInNewIcon fontSize="inherit" />
              </Link>
            )}<br/><br/>
            <div className={classes.bottomBar}>
              <MenuItem className={classes.bottomButton}>
                <ListItemIcon>
                  <CommentIcon className={classes.commentIcon} />
                  <Typography variant="subtitle2">{commentCount} comments</Typography>
                </ListItemIcon>
              </MenuItem>

              {/* {user && user.id === author.id && (
                <EditDeleteMenu
                  id={id}
                  title={title}
                  postType={postType}
                  subreddit={subreddit}
                  buttonType="buttonGroup"
                  textSubmission={textSubmission}
                  linkSubmission={linkSubmission}
                />
              )} */}
            </div>
            <AddComment user={p[2]} postId={p[0]} />
            {/* <SortCommentsMenu /> */}
          </div>
          <Divider className={classes.divider} />
          <ShowComments postId={p[0]}/>
        </Paper>

        </Card>
        
        {/* <Card style={{marginLeft:"100px",width:"300px",height:"300px"}}>
            <AboutCommunity isUserSub={isUserSub} commName={commName} commDesc={commDesc} commSubs={commSubs} commCreatedAt={commCreatedAt}/>
        </Card>
        <br/>
        <Card style={{marginTop:"350px",marginLeft:"-300px",width:"300px",height:"300px"}}>
            <Rules rules={rules}/>
        </Card>  */}
        </div>

        </>
    )
}
