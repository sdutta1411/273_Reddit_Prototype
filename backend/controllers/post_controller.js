const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

//Create a New Text Post
const createnewpost = async(req, res) => {
    console.log("Create Post API");
    Community.findOne({ communityName: req.body.communityName }).then(community => {
        if(!community){
            return res.status(404).json({message: 'Community does not exist.'});
        }
    else{
    console.log("Community found id: "+community._id);
    var postfields = {};
    UserProfile.findOne({ email: req.body.email }).then(user => {
    console.log("User found id: "+user._id);
    postfields.author = user._id;
    postfields.community = community._id;
    postfields.postType=req.body.postType;
    postfields.title = req.body.title;
    if(req.body.textSubmission){
    postfields.textSubmission = req.body.textSubmission;
    }
    postfields.imageSubmission = [];
    if(req.body.linkSubmission){
        postfields.linkSubmission = req.body.linkSubmission;
    }
    if(req.body.imageSubmission){
    req.body.imageSubmission.forEach(images=>{
    postfields.push(images);
    });
    }
    console.log("post fields: "+JSON.stringify(postfields));
    console.log("Creating a post in community: "+req.body.communityName);
    //create post
    new Post(postfields).save().then(post=>
        res.status(200).json(post));
    }).catch(function(err) {
        res.status(400).json(err);
    })
    }
    })    
    };

exports.createnewpost = createnewpost;