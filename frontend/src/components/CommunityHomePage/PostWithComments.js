import React from 'react'
import { Card, Checkbox,Typography } from '@material-ui/core';
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import { useCardStyles } from '../../styles/muiStyles';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import AboutCommunity from './AboutCommunity';
import Rules from './Rules';


export default function PostWithComments({postTitle,rules,isUserSub,commName,commDesc,commSubs,commCreatedAt}) {
    const classes = useCardStyles();
    const[isUpvoted, setIsUpvoted] = useState(false);
    const[isDownvoted, setIsDownvoted] = useState(false);
    // const[commHomePage, setCommHomePage] = useState(false);

    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
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


    return (
        <>
        <br/><br/>
        <div style={{display:"flex"}}>

        <Card style={{marginLeft:"50px",width:"900px",height:"1000px"}}>
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
          {postTitle}{' '}
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
        </Typography>
      </div>
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
