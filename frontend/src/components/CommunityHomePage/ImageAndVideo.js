import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import CreatePostHeader from './CreatePostHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CreatePostFooter from './CreatePostFooter';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

export default function ImageAndVideo() {
    const[title,setTitle] = useState("");
    const[imgvid, setImgAndVid] = useState([]);
    const[imgvidurls,setImgAndVidUrls] = useState([]);
    const[noOfImg, setNoOfImg] = useState(0);
    console.log("noOfImg: "+noOfImg);

    const uploadImage = (files) =>{
        console.log(files[0]);
        console.log("Uploading to cloudinary");
        var formData = new FormData();
        formData.append("file", imgvid);
        formData.append("upload_preset", "gvfsmpgq");
        axios.post("https://api.cloudinary.com/v1_1/dh9bmhy5e/image/upload", formData)
        .then((response) =>{
            console.log(JSON.stringify(response.data));
            var strRes = JSON.stringify(response.data);
            var data = JSON.parse(strRes);
            setImgAndVidUrls(oldArray => [...oldArray, data.secure_url])
            console.log("imgvidurls::::"+imgvidurls);
        });
    }

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
            <Card style={{width:"717px",height:"300px",marginLeft:"230px"}}>
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
            <Card style={{height:"100px"}}>
            <input
            style={{color:"#0079D3"}}
            placeholder="Drag and drop images or"
            type="file"
            onChange={(e)=>setImgAndVid(e.target.files[0])} 
            multiple
            //onSelect={setImgAndVid(imgvid++)}
            />

            <Button
            style={{textTransform:"none",borderRadius:"10px",color:"#0079D3",background:"FFFFFF"}} 
            value="upload"
            variant="outlined"
            onClick={uploadImage}>Upload</Button>
            </Card>
            

            {/* <OutlinedInput
            margin="dense"
            fullWidth={true}
            multiline
            rows="12"
            style={{color:"#0079D3"}}
            placeholder="Drag and drop images or"
            //value="upload"
            //onChange={e=> setText(e.target.value)}  
            id="outlined-basic" variant="outlined" 
            />             */}
            </CardContent>
            <br/>
            <CreatePostFooter title={title} imgvidurls={imgvidurls}/>
            </Card>
        </Col>
        </Row>
        <Row></Row>
        </Container>
        </>
    )
}
