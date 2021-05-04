import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import NavBarAfterLogin from '../NavBar/NavBarAfterLogin';
import Grid from '@material-ui/core/Grid';
import CommunityCover from './CommunityCover';
import CreatePost from './CreatePost';
import Paper from '@material-ui/core/Paper';
import {useEffect ,setState} from 'react'
import axios from 'axios';
import {  useSelector,useDispatch } from 'react-redux';

export default function CommunityHomePage() {
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    const dispatch = useDispatch();

    useEffect(() =>{
        const onLoadCommunityHomePage = () =>{
            const requestOptions = {
                method: 'GET',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
            axios.get("http://localhost:3001/api/community/getCommunityDetails",requestOptions)
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
