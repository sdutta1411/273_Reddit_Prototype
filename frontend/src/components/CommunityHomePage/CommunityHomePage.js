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
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import getEditedThumbail from '../../utils/cloudinaryTransform';
import AboutCommunity from './AboutCommunity';
import Rules from './Rules';


import {
    Paper,
    Typography,
    useMediaQuery,
    CardMedia,
    Link,
    Button,
  } from '@material-ui/core';
import PostWithComments from './PostWithComments';

export default function CommunityHomePage({communityName}) {

    const classes = useCardStyles();

    const baseUrl = `${backendUrl}/api/posts`;
    const[isUserSub, setIsUserSub] = useState(false);
    const[posts, setPosts] = useState([]);
    const[user, setUser] = useState("");
    const[isUpvoted, setIsUpvoted] = useState(false);
    const[isDownvoted, setIsDownvoted] = useState(false);
    //community details
    const[commDetails, setCommDetails] = useState("");
    const[commName, setCommName] = useState("");
    const[commDesc, setCommDesc] = useState("");
    const[commSubs, setCommSubs] = useState("");
    const[commCreatedAt, setCommCreatedAt] = useState("");
    const[commRules, setCommRules] = useState([]);


    const[commHomePage, setCommHomePage] = useState(true);
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage?userLocalStorage.token:'';
    var communityName = 'Team11';

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
            // get community details
            const commDetails = await axios.post('http://localhost:3001/api/community/getCommunityDetails',body,{
              headers: headers
            });
            if(commDetails.status===200){

              console.log("Get Community details response: "+JSON.stringify(commDetails.data));
              console.log("Community name: "+commDetails.data.communityName);
              console.log("comm desc: "+commDetails.data.description);
              console.log("no of ppl: "+commDetails.data.subscriberCount);
              setCommDetails(commDetails.data);
              setCommName(commDetails.data.communityName);
              setCommDesc(commDetails.data.description);
              setCommSubs(commDetails.data.subscriberCount);
              setCommCreatedAt(commDetails.data.created_at);
              setCommRules(commDetails.data.rules);
            }
        }
        onLoadCommunityHomePage();
    },[]);
    // const linkToShow =
    // postType === 'Link'
    //   ? linkSubmission
    //   : postType === 'Image'
    //   ? imageSubmission.imageLink
    //   : '';
    // const formattedLink = trimLink(prettifyLink(linkToShow), 30);

  
    return (
        <>
    <CommunityCover communityName={communityName} isUserSub={isUserSub}/>
        {/* <PostList /> */}

    {/* <Paper className={classes.root} variant="outlined"> */}
    <div style={{display:"flex"}}>
    <Card style={{marginLeft:"20px",width:"1100px",borderRadius:"5px",marginBottom:"10px"}}>
    {posts.map(post=>
      <RouterLink
      style={{ textDecoration: 'none' }} 
      to={{pathname: `/comments` ,
                state:`${post._id},${communityName},${user.username}`}}>
      <Paper className={classes.root} variant="outlined">
      {/* upvote and downvote */}
      {/* <span>{post.title}</span> */}
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
      <div className={classes.postInfoWrapper}>
        <Typography variant="h6" className={classes.title}>
          {post.title}{' '}
          <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                post.postType === 'Link'
                  ? fixUrl(post.linkSubmission)
                  : post.postType === 'Image'
                  ? post.imageSubmission
                  : ''
              }
            >
              {/* {formattedLink} */}
              {post.postType === 'Text' ? null : (
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
            <Link component={RouterLink} to={`/u/${post.author.username}`}>
              u/{post.author.username}
            </Link>{' '}
            • <TimeAgo datetime={new Date(post.created_at)} />
            {post.created_at !== post.updated_at && '*'}
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>

        {/* comments count */}
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${post.comments}`}
          >          
            {post.comments.length} comments
          </Button>
        </div>
      </div>
        
        </Paper>
        </RouterLink>
        )}
        </Card>
        <Card style={{marginRight:"8px",marginLeft:"30px",width:"300px",height:"300px"}}>
            <AboutCommunity isUserSub={isUserSub} commName={commName}  commDesc={commDesc} commSubs={commSubs} commCreatedAt={commCreatedAt}/>
        </Card>
        <br/>
        <Card style={{marginTop:"350px",marginLeft:"-300px",width:"300px",height:"300px"}}>
            <Rules commRules={commRules}/>
        </Card>
        </div>
        {/* </Paper> */}
        </>
    )
}