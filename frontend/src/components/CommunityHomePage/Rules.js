import React from 'react'

export default function Rules({commRules}) {

    // for(var i=0;i<commRules.length;i++){
    //     return(
    //         <div style={{marginLeft:"10px",background:"#FFFFFF"}}>
    //         {commRules[i]}
    //         </div>
    //     )
    // }
    return (
        <>
        <div style={{background:"#0079D3",color:"#FFFFFF",fontWeight:"bold",height:"30px"}}>
           <span style={{marginLeft:"10px"}}>Rules</span>
        </div>
        <div style={{marginLeft:"10px",background:"#FFFFFF"}}>
            {commRules}{' '}
        </div>
        </>
    )
}
