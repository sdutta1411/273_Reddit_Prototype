const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");

//Create a New Text Post
const createnewpost = async(req, res) => {
    console.log("Create Post API");
    var postfields = {};
    postfields.author = req.user.id;
    postfields.communityName = req.body.communityName;
    postfields.postType=req.body.postType;
    postfields.title = req.body.title;
    postfields.textSubmission = req.body.textSubmission;
    postfields.imageSubmission = [];
    postfields.linkSubmission = req.body.linkSubmission;
    req.body.imageSubmission.forEach(images=>{
    postfields.push(images);
    });
    const user = await User.findById(req.user.id);
    const community = await Community.find(communityName);
    if(!user){
        return res
        .status(404)
        .send({message: 'User does not exist.'});
    }
    if(!community){
        return res
        .send(404)
        .send({message: 'Community does not exist.'});
    }

    new Post(postfields).save().then(post=>
        res.status(200).json(post));
    };

exports.createnewpost = createnewpost;