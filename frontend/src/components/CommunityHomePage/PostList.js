import React from 'react';
import {useEffect ,useState,setState} from 'react'
import axios from 'axios';
import backendUrl from '../../backendUrl';
import PostCard from './PostCard';

const PostList = () => {
    const baseUrl = `${backendUrl}/api/posts`;
    var userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userLocalStorage.token;
    var communityName = 'Avengers';
    const[post, setPost] = useState("");
    const[user,setUser] = useState("");
    const toggleUpvote = () =>{

    }
    const toggleDownvote = () =>{
        
    }
    useEffect(() =>{
        const onLoadPosts = async() =>{
            var sortBy = 'old';
            var limit = 10;
            var page = 100;

            //get posts of community
            const requestOptions = {
                method: 'POST',
               headers: { 'Content-Type': 'application/json' ,'Authorization': token},
              }
              const headers = {
                'Content-Type': 'application/json' ,
                'Authorization': token
              }
              const body = {
                'email':userLocalStorage.email
               }
                const response = await axios.post('http://localhost:3001/api/user/getUserDetails',body,{
                headers: headers
                });
                if(response.status===200){
                    console.log("Response: "+response.data);
                    setUser(response.data);
                }
            // axios.get(`${baseUrl}/getPosts/?communityName=${communityName}&sortby=${sortBy}&limit=${limit}&page=${page}`,requestOptions)
            axios.get(`${baseUrl}/getPosts/?communityName=${communityName}`,requestOptions)
            .then(response=>{
                console.log("Response: "+JSON.stringify(response.data));
                setPost(post);
                console.log("Posts: "+post);
            }).catch(err=>{
            console.log(err);
            });
        }
        onLoadPosts();
    },[]);

    return (
        <>
        {post?(post.results.map((post) => (
          <PostCard
            post={post}
            user={user}
            key={post._id}
            toggleUpvote={toggleUpvote}
            toggleDownvote={toggleUpvote}
          />
        ))) : null }
        </>
    );
}

export default PostList;
