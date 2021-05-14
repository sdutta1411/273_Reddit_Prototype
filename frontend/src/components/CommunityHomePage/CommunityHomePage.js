import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
// import NavBarAfterLogin from '../NavBar/NavBarAfterLogin';
import Grid from '@material-ui/core/Grid';
import CommunityCover from './CommunityCover';
import CreatePost from './CreatePost';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import backendUrl from '../../backendUrl';
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
import TablePagination from "@material-ui/core/TablePagination";


import {
    Paper,
    Typography,
    useMediaQuery,
    CardMedia,
    Link,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    FormControlLabel,
    Switch,
    Select
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
    const token = localStorage.getItem('token');
    var communityName = 'Team11';

    
    const [sort, setSort] = useState(10);
  const [sorted , setSorted] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    console.log("handleChange:" +event.target.value);
    setSort(event.target.value);
  };
  const toggleChecked = () => {
    setSorted((prev) => !prev);
  };

    const handleUpvoteToggle = async(postId) => {
      console.log("post id: "+postId);
      const headers = {
        'Content-Type': 'application/json' ,
        'Authorization': token
        }
        const body = {
       'email':userLocalStorage.email,'postId':postId
        }
        try {
          const response = await axios.post("http://localhost:3001/api/posts/upvote",body,{
            headers: headers
          });
          if(response.status===200){
            console.log("you upvoted post");
            setIsUpvoted(true);
          }
        } catch (err) {
          console.log("Error: "+err);
        }
      };
    
      const handleDownvoteToggle = async(postId) => {
        const headers = {
          'Content-Type': 'application/json' ,
          'Authorization': token
          }
          const body = {
         'email':userLocalStorage.email,'postId':postId
          }
        try {
          const response = await axios.post("http://localhost:3001/api/posts/downvote",body,{
            headers: headers
          });
          if(response.status===200){
            console.log("you downvoted post");
            setIsDownvoted(true);
          }
        } catch (err) {
          console.log("Error: "+err);
        }
      };
    useEffect(() =>{
        const onLoadCommunityHomePage = async() => {
            //get posts of community
            const headers = {
              'Content-Type': 'application/json' ,
              'Authorization': token
              }
              const body = {
                'email':userLocalStorage.email,
                'communityName':communityName,
                'sorted': sorted,
                'type':sort
              }
            // const requestOptions = {
            //     method: 'GET',
            //    headers: { 'Content-Type': 'application/json' ,'Authorization': token},
            //   }
            const postres = await axios.post(`${baseUrl}/getPosts`,body,{
              headers: headers
            });
            if(postres.status===200){
                console.log("Get Posts Response: "+JSON.stringify(postres.data));
                setPosts(postres.data);
                console.log("Posts----"+postres);
            }

            // get user communities
            // const body = {
            //    'email':userLocalStorage.email,'communityName':communityName
            // }
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
    },[sort, sorted]);
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
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={10}>created at</MenuItem>
          <MenuItem value={20}>most popular</MenuItem>
          <MenuItem value={30}>most unpopular</MenuItem>
        </Select>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Descending</Grid>
          <Grid item>
          <FormControlLabel
          control={<Switch checked={sorted} onChange={toggleChecked}  color="primary"/>}
        />          </Grid>
          <Grid item>Ascending</Grid>
        </Grid>
      </Typography>
      </FormControl>

    <div style={{display:"flex"}}>
    <Card style={{marginLeft:"20px",width:"1100px",borderRadius:"5px",marginBottom:"10px"}}>
    {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post=>
      <RouterLink
      style={{ textDecoration: 'none' }} >
      <Paper className={classes.root} variant="outlined">
      {/* upvote and downvote */}
      {/* <span>{post.title}</span> */}
      <div className={classes.votesWrapper}>
        <Button
        // checked={posts.upvotedBy.includes(user._id)}
        startIcon={<ArrowUpwardRoundedIcon style={{ color: '#b2b2b2' }} />}
        // startIcon={<ArrowUpwardRoundedIcon style={{ color: '#FF8b60' }} />}
        onClick={()=>handleUpvoteToggle(post._id)}
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
          {post.pointsCount}
        </Typography>
            <Button
            // checked={posts.downvotedBy.includes(user.id)}
            startIcon={<ArrowDownwardRoundedIcon style={{ color: '#b2b2b2' }} />}
            onClick={()=>handleDownvoteToggle(post._id)}
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
            to={{pathname: `/comments` ,
                state:`${post._id},${communityName},${user.username}`}}
          >          
            {post.comments.length} comments
          </Button>
        </div>
      </div>
        
        </Paper>
        </RouterLink>
        )}
        <TablePagination
      rowsPerPageOptions={[2, 5, 10]}
      component="div"
      count={posts.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      />
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