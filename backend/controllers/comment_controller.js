const UserProfile = require("../models/UserProfile");
const Community = require("../models/Community");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// create comment
const createcomment = async (req,res) => {
    console.log("Create comment API");
    const user = await UserProfile.findOne({email:req.body.email});
    const post = await Post.findOne({_id:req.body.postId});
    const community = await Community.findOne({communityName:req.body.communityName});
    const newComment = new Comment({
        commentedBy:user._id,
        commentedCommunity:community._id,
        commentBody:req.body.commentBody,
        upvotedBy:user._id,
        pointsCount:1
    });
    const savedComment = await newComment.save();
    console.log("savedComment: "+savedComment);
    post.comments = post.comments.concat(savedComment._id);
    await post.save();
    return res.status(200).json(savedComment);
}

// get comments
const getComments = async (req,res) => {
    console.log("Get Comments API");
    const post = await Post.findOne({_id:req.body.postId});
    for(var i=0;i<post.comments.length;i++){
        console.log("post comments: "+post.comments[i]);
        const commentText = await Comment.findOne({_id:post.comments[i]});
        console.log("comment text: "+commentText.commentBody);
    }

    // post.comments.forEach(comment=>{
    //     const commentText = await Comment.findOne({_id:comment});
    //     console.log("comment text: "+commentText);
    //     console.log("Comment: "+comment+"comment text: "+commentText.commentBody);
    //     console.log();
    // })
    //return res.status(200).json(post.comments);
}






module.exports = {
    createcomment,
    getComments
  }; 