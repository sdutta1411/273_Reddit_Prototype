import React from 'react'

export default function Rules({commRules}) {
    return (
        <>
        <div style={{background:"#0079D3",color:"#FFFFFF",fontWeight:"bold",height:"30px"}}>
           <span style={{marginLeft:"10px"}}>Rules</span>
        </div>
        <div style={{marginLeft:"10px",background:"#FFFFFF"}}>
            {commRules}
        </div>
        </>
    )
}
