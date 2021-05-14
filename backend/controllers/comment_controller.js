const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");
const Comment = require("../models/Comment")
const mongoose = require('mongoose');

const createnewcomment = async(req, res) => {
    const comment = new Comment();
    comment.commentedBy = mongoose.Types.ObjectId(req.body.userid);
    comment.commentBody = req.body.comment;
    comment.upvotedBy = [];
    comment.upvotedBy.push(mongoose.Types.ObjectId(req.body.userid));
    console.log("New comment "+ JSON.stringify(comment));
    console.log("Post Id "+req.body.postId);
    comment.save();
    var post = await Post.findById({_id:req.body.postId});
    console.log("Post Data "+ JSON.stringify(post));
    var commentObj = {};
    commentObj.comment = mongoose.Types.ObjectId(comment._id);
    if(!post.comments.length){
        post.comments = [];
    }
    post.comments.push(commentObj);
    post.save();
    var savedPost = {};
    savedPost.post = post;
    savedPost.getComments = await buildcomments(post.comments);
    console.log(JSON.stringify(savedPost));
    res.status(200).json(savedPost);
}


async function buildcomments(comments) {
    console.log("comments "+ JSON.stringify(comments))
    var getComments = []
    for( var j=0; j<comments.length; j++){
        var comment = {};
        var commentData = await Comment.findById(comments[j].comment);
        if(commentData.comments.length){
            comment.replies = await buildcomments(commentData.comments);
        }
        comment.comment = commentData;
        console.log("building comment "+ JSON.stringify(comment));
        getComments.push(comment)
    }
    console.log("getComments "+ JSON.stringify(getComments));
    return getComments;
}
const addReplyToComment = async(req,res) => {
    var reply = new Comment();
    reply.commentedBy = req.body.userid;
    reply.commentBody = req.body.comment;
    console.log("New comment "+ JSON.stringify(reply));
    console.log("Post Id "+req.body.postId);
    reply.save();
    var comment = await Comment.findById({_id:req.body.commentId});
    console.log("Post Data "+ JSON.stringify(comment));
    var commentObj = {};
    commentObj.comment = mongoose.Types.ObjectId(reply._id);

    if(!comment.comments.length){
        console.log("Empty Array");
        comment.comments = [];
    }
    comment.comments.push(commentObj);
    comment.save();
    var post = await Post.findById({_id:req.body.postId});
    var savedPost = {};
    savedPost.post = post;
    savedPost.getComments = await buildcomments(post.comments);
    res.status(200).json(savedPost);
}

// get replies
async function getReplies(comments){
    var getComments = []
    for( var j=0; j<comments.length; j++){
        var comment = {};
        var commentData = await Comment.findById(comments[j].comment);
        console.log("commentData: "+commentData);
        comment.comment = commentData; //parent comment
        comment.replies = [];
        if(commentData.comments.length){
            // var username = await UserProfile.findById({_id:commentData.commentedBy});
            // console.log("username: "+username.username);
            // commentData.commentedBy = username.username;
            comment.replies = await getReplies(commentData.comments); //reply comment
        }
        
      //  console.log("building comment "+ JSON.stringify(comment));
        getComments.push(comment)
    }
    return getComments;
}
// get comments
const getComments = async (req,res) => {
    console.log("Get Comments API");
    const post = await Post.findById({_id:req.body.postId});
    const postwithcomments = await getReplies(post.comments);
    console.log("postwith comments: "+JSON.stringify(postwithcomments));
    return res.status(200).json(postwithcomments);
    // for(var i=0;i<post.comments.length;i++){
    //     console.log("post comments: "+post.comments[i]);
    //     const commentText = await Comment.findOne({_id:post.comments[i]});
    //     console.log("comment text: "+commentText.commentBody);
    // }

    

    // post.comments.forEach(comment=>{
    //     const commentText = await Comment.findOne({_id:comment});
    //     console.log("comment text: "+commentText);
    //     console.log("Comment: "+comment+"comment text: "+commentText.commentBody);
    //     console.log();
    // })
    //return res.status(200).json(post.comments);
}


module.exports = {
    createnewcomment,
    addReplyToComment,
    buildcomments,
    getComments
};
