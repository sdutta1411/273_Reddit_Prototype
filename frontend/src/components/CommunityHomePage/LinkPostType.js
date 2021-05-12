import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import CreatePostHeader from './CreatePostHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import validator from 'validator'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState } from "react";
import CreatePostFooter from './CreatePostFooter';

export default function LinkPostType() {

    const[title,setTitle] = useState("");
    const[link,setLink] = useState("");
    const postType="Link";

    return (
        <>
        <Container>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col>
            <h3>Create a post</h3>
            <Divider />
            <CreatePostHeader />
            <Card style={{width:"717px",height:"400px",marginLeft:"230px"}}>
            <CardContent>
            <OutlinedInput
            margin="dense"
            fullWidth={true}
            // endAdornment={<InputAdornment position="end">0/180</InputAdornment>} 
            placeholder="Title"
            onChange={e=> setTitle(e.target.value)} 
            id="outlined-basic" label="Outlined" variant="outlined" />
            <br/><br/>
            <OutlinedInput
            maxlength="180"
            margin="dense"
            fullWidth={true}
            multiline
            rows="8"
            placeholder="Url"
            onChange={e=> setLink(e.target.value)}  
            id="outlined-basic" variant="outlined" 
            />            
            </CardContent>
            <br/>
            <CreatePostFooter postType={postType} title={title} link={link} />
            </Card>
        </Col>
        </Row>
        <Row></Row>
        </Container>
        </>
    )
}
