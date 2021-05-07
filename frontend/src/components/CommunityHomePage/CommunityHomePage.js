import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import CommunityCover from './CommunityCover';
import CreatePost from './CreatePost';
import Paper from '@material-ui/core/Paper';
import {useEffect ,setState} from 'react'
import axios from 'axios';
import backendUrl from '../../backendUrl';


export default function CommunityHomePage() {

    const baseUrl = `${backendUrl}/api/community`;

    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;

    useEffect(() =>{
        const onLoadCommunityHomePage = () =>{
            var sortBy = 'old';
            var limit = 10;
            var page = 100;
            var communityName = 'Team11';
            const requestOptions = {
                method: 'GET',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
            axios.get(`${baseUrl}/getPosts/?communityName=${communityName}&sortby=${sortBy}&limit=${limit}&page=${page}`,requestOptions)
            .then(response=>{
                console.log("Response: "+response.data)
            }).catch(err=>{
            console.log(err);
            });
        }
        onLoadCommunityHomePage();
    },[]);
    return (
        <>
        <Container>
        <CommunityCover />
        </Container>
        </>
    )
}
