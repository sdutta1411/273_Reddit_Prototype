import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
// import NavBarAfterLogin from '../NavBar/NavBarAfterLogin';
import Grid from '@material-ui/core/Grid';
import CommunityCover from './CommunityCover';
import CreatePost from './CreatePost';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import backendUrl from '../../backendUrl';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import PostList from './PostList';
import { useCardStyles } from '../../styles/muiStyles';
import { Card, Checkbox } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import MessageIcon from '@material-ui/icons/Message';
import LinkIcon from '@material-ui/icons/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';
import TimeAgo from 'timeago-react';

import {
    Paper,
    Typography,
    useMediaQuery,
    CardMedia,
    Link,
    Button,
  } from '@material-ui/core';

export default function CommunityHomePage() {

    const classes = useCardStyles();

    const baseUrl = `${backendUrl}/api/posts`;
    const[isUserSub, setIsUserSub] = useState(false);
    const[posts, setPosts] = useState([]);
    const[user, setUser] = useState("");
    const[isUpvoted, setIsUpvoted] = useState(false);
    const[isDownvoted, setIsDownvoted] = useState(false);

    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    var communityName = 'Avengers';

    const requestOptions = {
        method: 'GET',
       headers: { 'Content-Type': 'application/json' ,'Authorization': token},
      }
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
    useEffect(() =>{
        const onLoadCommunityHomePage = async() =>{
            var sortBy = 'old';
            var limit = 10;
            var page = 100;

            //get posts of community
            const requestOptions = {
                method: 'GET',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
            // axios.get(`${baseUrl}/getPosts/?communityName=${communityName}&sortby=${sortBy}&limit=${limit}&page=${page}`,requestOptions)
            axios.get(`${baseUrl}/getPosts/?communityName=${communityName}`,requestOptions)
            .then(response=>{
                console.log("Get Posts Response: "+JSON.stringify(response.data));
                setPosts(response.data);
                console.log("Posts----"+posts);
            }).catch(err=>{
            console.log(err);
            });

            // get user communities
            const headers = {
                'Content-Type': 'application/json' ,
                'Authorization': token
            }
            const body = {
               'email':userLocalStorage.email,'communityName':communityName
            }
            const response = await axios.post('http://localhost:3001/api/community/checkUserSubscribed',body,{
            headers: headers
            });
            if(response.status===200){
                console.log("user is subscribed to community:: "+JSON.stringify(response.data))
                setIsUserSub(true);
            }
            
            //get user details
                const res = await axios.post('http://localhost:3001/api/user/getUserDetails',body,{
                headers: headers
                });
                if(res.status===200){
                    console.log("Get User details: "+JSON.stringify(res.data));
                    setUser(res.data);
                }
        }
        onLoadCommunityHomePage();
        // const onLoadCommunityHomePage = () =>{
        //     const requestOptions = {
        //         method: 'GET',
        //        headers: { 'Content-Type': 'application/json' ,'Authorization': token},
        //       }
        //     axios.get("http://localhost:3001/api/community/getCommunityDetails",requestOptions)
        //     .then(response=>{
        //         console.log("Response: "+response.data)
        //     }).catch(err=>{
        //     console.log(err);
        //     });
        // }
        // onLoadCommunityHomePage();
    },[]);
    return (
        <>
        <Container>
        <CommunityCover communityName={communityName} isUserSub={isUserSub}/>
        {/* <PostList /> */}

    {/* <Paper className={classes.root} variant="outlined"> */}
    {posts.map(post=>
      <Paper>
      {/* upvote and downvote */}
      {/* <span>{post.title}</span> */}
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


        {post.postType === 'Text' ? (
          <RouterLink to={'/comments'}>
          <Card>
            <Paper elevation={0} square className={classes.thumbnail}>
              <MessageIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
            <Paper style={{marginLeft:"100px"}}elevation={0} className={classes.title}>{post.textSubmission}</Paper>
            </Card> 
          </RouterLink>
        ) : post.postType === 'Link' ? (
          <a href={post.linkSubmission} target="_noblank">
            <Paper elevation={0} square className={classes.thumbnail}>
              <LinkIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
              <h3>{post.linkSubmission}</h3>
            </Paper>
          </a>
        ) 
        : (
          <Paper elevation={0} square className={classes.thumbnail}>
            {/* <CardMedia
              className={classes.thumbnail}
              image={post.imageSubmission}
              title={post.ArrowUpwardRoundedIcontitle}
              component="a"
              href={post.imageSubmission}
              target="_noblank"
            /> */}
          </Paper>
        )}


      {/* <Typography variant="h6" className={classes.title}>
          {post.title}{' '}
          <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                post.postType === 'Link'
                  ? post.linkSubmission
                  : post.postType === 'Image'
                  ? post.imageSubmission
                  : ''
              }
            > */}
              {/* {formattedLink} */}
              {/* {post.postType === 'Text' ? null : (
                <OpenInNewIcon fontSize="inherit" />
              )}
            </Link>
          </Typography>
        </Typography>
        <Typography variant="subtitle2"> */}
          {/* <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            r/{subreddit.subredditName}
          </Link> */}
          {/* <Typography variant="caption" className={classes.userAndDate}>
            Posted by{' '}
            <Link component={RouterLink} to={`/u/${post.author}`}>
              u/{post.author}
            </Link>{' '}
            • <TimeAgo datetime={new Date(post.createdAt)} />
            {post.createdAt !== post.updatedAt && '*'}
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink} */}
             {/* to={`/comments/${id}`} */}
          {/* > */}
            {/* {commentCount}  */}
            {/* comments
          </Button>
        </div> */}
        
        </Paper>
        
        )}

        </Container>
        </>
    )
}
