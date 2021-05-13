import React from 'react'
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';
import { Button } from '@material-ui/core';

export default function AboutCommunity({isUserSub,commName,commDesc,commSubs,commCreatedAt}) {

    return (
        <>
        <div style={{background:"#0079D3",color:"#FFFFFF",fontWeight:"bold",height:"30px"}}>
           <span style={{marginLeft:"10px"}}>About Community</span> 
        </div>
        <div style={{marginLeft:"10px",background:"#FFFFFF"}}>
        <h2 style={{fontWeight:"bold"}}>
            {commName}
        </h2>
        <span>
        {commDesc}
        </span><br/><br/>
        <span><b>{commSubs}</b> subscribers</span><br/><br/>
        <Button
        disabled="true"
        startIcon={<CakeRoundedIcon />}
        >{commCreatedAt}</Button>

        <br/><br/>
        {isUserSub?
        <Button
        variant="outlined" 
        style={{fontSize:"14px",borderColor:"#CC3600",color:"#CC3600", borderRadius:"10px",padding:"10px 20px 10px 20px",textTransform:"none",background:"#FFFFFF"}}>Joined</Button>:
        <Button
        variant="outlined" 
        style={{fontSize:"14px",borderColor:"#CC3600",color:"#CC3600", borderRadius:"5px",padding:"13px 10px 7px 24px",textTransform:"none",background:"#FFFFFF"}}>Join</Button>
        }
        </div>
        </>
    )
}
