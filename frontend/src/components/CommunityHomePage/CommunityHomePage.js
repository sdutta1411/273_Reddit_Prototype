import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
// import NavBarAfterLogin from '../NavBar/NavBarAfterLogin';
import Grid from '@material-ui/core/Grid';
import CommunityCover from './CommunityCover';
import CreatePost from './CreatePost';
import Paper from '@material-ui/core/Paper';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import backendUrl from '../../backendUrl';

export default function CommunityHomePage() {


    const baseUrl = `${backendUrl}/api/posts`;
    const[isUserSub, setIsUserSub] = useState(false);

    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    var communityName = 'Avengers';

    useEffect(() =>{
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
        </Container>
        </>
    )
}
