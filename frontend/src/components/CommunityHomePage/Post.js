import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import CreatePostHeader from './CreatePostHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Chip from '@material-ui/core/Chip';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import axios from 'axios';
import Editor from '@draft-js-plugins/editor';
import CreatePostFooter from './CreatePostFooter';
import { useState } from "react";


export default function Post() {

    const[title,setTitle] = useState("");
    const[text, setText] = useState("");

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
            <br/>
            <CardContent>

            <OutlinedInput
            margin="dense"
            fullWidth={true}
            // endAdornment={<InputAdornment position="end">0/180</InputAdornment>} 
            placeholder="Title"
            onChange={e=> setTitle(e.target.value)} 
            id="outlined-basic" label="Outlined" variant="outlined" />
            <br/><br/>
            {/* <TextField
            id="outlined-textarea"
            fullWidth={true}
            placeholder="Text(Optional)"
            multiline
            rows="6"
            variant="outlined"
            />             */}
            <OutlinedInput
            maxlength="180"
            margin="dense"
            style={{alignItems:"flex-end"}}
            fullWidth={true}
            multiline
            rows="8"
            placeholder="Text(Optional)"
            onChange={e=> setText(e.target.value)}  
            id="outlined-basic" variant="outlined" 
            endAdornment={<InputAdornment position="end">0/180</InputAdornment>} 
            />
            </CardContent>
            <br/>
            <CreatePostFooter title={title} text={text} />
            </Card>            
        </Col>
        </Row>
        <Row></Row>
        </Container>
        </>
    )
}
