<<<<<<< HEAD
import React from 'react'
import { Form,FormControl,Modal,Container,Row, Col,Image} from 'react-bootstrap';
import Navbar from '../navBar/navBar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useState ,useEffect} from 'react'
=======
import React from "react";
import {
  Form,
  FormControl,
  Modal,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import Navbar from "../navBar/navBar";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
>>>>>>> c1f6dbffbc867ed93de08e1283e44dd2e595e282
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CreatePostHeader from "./CreatePostHeader";
import { Switch, Route, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default function CreatePost() {
  const [showPost, setShowPost] = useState(true);

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <h3 style={{ marginLeft: "20px" }}>Create a post</h3>
            <Divider />
            <CreatePostHeader />
            {/* <Card>
            <CardContent>

            <CreatePostHeader />
            
            </CardContent>
            </Card> */}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}
