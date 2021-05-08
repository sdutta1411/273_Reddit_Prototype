import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
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
    var communityName = 'Team11';

    useEffect(() =>{
        const onLoadCommunityHomePage = async() =>{
            var sortBy = 'old';
            var limit = 10;
            var page = 100;
            const requestOptions = {
                method: 'GET',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
            axios.get(`${baseUrl}/getPosts/?communityName=${communityName}&sortby=${sortBy}&limit=${limit}&page=${page}`,requestOptions)
            .then(response=>{
                console.log("Response: "+JSON.stringify(response.data))
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
                setIsUserSub(true);
            }
        }
        onLoadCommunityHomePage();
    },[]);
    return (
        <>
        <Container>
        <CommunityCover communityName={communityName} isUserSub={isUserSub}/>
        </Container>
        </>
    )
}
