import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
<<<<<<< HEAD
// import NavBarAfterLogin from '../NavBar/NavBarAfterLogin';
=======
>>>>>>> d07c2997e48552b4a23318fd0238ada703506086
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
<<<<<<< HEAD
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
=======
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
                console.log("user is subscribed to community:: "+JSON.stringify(response.data))
                setIsUserSub(true);
            }
        }
        onLoadCommunityHomePage();
>>>>>>> d07c2997e48552b4a23318fd0238ada703506086
    },[]);
    return (
        <>
        <Container>
        <CommunityCover communityName={communityName} isUserSub={isUserSub}/>
        </Container>
        </>
    )
}
