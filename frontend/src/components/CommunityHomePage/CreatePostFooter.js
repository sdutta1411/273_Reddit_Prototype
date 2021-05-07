import React from 'react'
import Chip from '@material-ui/core/Chip';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import axios from 'axios';


export default function CreatePostFooter({title,text,imgvidurls,link}) {
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    var token = userLocalStorage.token;
    console.log("Title & text in Create post FOOTER" +title+ ","+text);
    console.log("imgvidurls :"+imgvidurls);
    console.log("link: "+link);
    const handleLiveChatClick = () =>{
        console.log("clicked live chat chip")
    }

    const handleSpoilerClick = () =>{
        console.log("clicked spolier chip") 
    }

    const handleSaveDraftClick = () =>{
        console.log("clicked handleSaveDraftClick");
    }

    const handlePostClick = () =>{
        console.log("creating text post");
        const headers = {
            'Content-Type': 'application/json' ,
            'Authorization': token
        }
        const body = {
            'email':userLocalStorage.email,
            'communityName':userLocalStorage.communityName,
            'title':title,
            // 'postType':
            'textSubmission':text,
            'imageSubmission':imgvidurls,
            'linkSubmission':link
        }
        console.log("Requestoptions: "+JSON.stringify(body));
        axios.post("http://localhost:3001/api/posts/createnewpost",body,{
            headers: headers
        })
        .then(response=>{
            console.log("Response for create new post: "+response.data)
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <>
            <Chip
            style={{marginLeft:"20px",fontWeight:"bold",fontSize:"15px",color:"#999",background:"#FFFFFF"}}
            icon={<ChatRoundedIcon />}
            label="LIVE CHAT"
            clickable
            variant="outlined"
            onClick={handleLiveChatClick}
            />

            <Chip
            style={{marginLeft:"30px",fontWeight:"bold",fontSize:"15px",color:"#999",background:"#FFFFFF"}}
            icon={<AddRoundedIcon />}
            label="SPLOILER"
            clickable
            variant="outlined"
            onClick={handleSpoilerClick}
            />

            <Chip
            style={{marginLeft:"170px",fontSize:"15px",color:"#0079D3",background:"#FFFFFF",fontWeight:"bold"}}
            label="Save Draft"
            clickable
            variant="outlined"
            onClick={handleSaveDraftClick}
            />

            <Chip
            style={{marginLeft:"60px",fontSize:"15px",color:"#FFFFFF",background:"#0079D3",fontWeight:"bold"}}
            label="Post"
            clickable
            onClick={handlePostClick}
            />
    </>
    )
}
