const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");
const postTypeValidator = require("../utils/postTypeValidator");
const paginateResults = require("../utils/paginateResults");
    // create new post
    const createnewpost = async (req, res) => {
        console.log("create post controller...");
        const {
          email,
          title,
          communityName,
          postType,
          textSubmission,
          linkSubmission,
          imageSubmission,
        } = req.body;
      
        const validatedFields = postTypeValidator(
          postType,
          textSubmission,
          linkSubmission,
          imageSubmission
        );
      
        const author = await UserProfile.findOne({ email: req.body.email });
        if(author) console.log("user exists");
        const targetCommunity = await Community.findOne({ communityName: req.body.communityName });
        if(targetCommunity) console.log("community exists");
        if (!author) {
          return res
            .status(404)
            .send({ message: 'User does not exist.' });
        }
      
        if (!targetCommunity) {
          return res.status(404).send({
            message: `Community : '${targetCommunity.communityName}' does not exist in database.`,
          });
        }      
        console.log("creating post");
        const newPost = new Post({
          title,
          community: targetCommunity._id,
          author: author._id,
          upvotedBy: [author._id],
          pointsCount: 1,
          comments:[],
         ...validatedFields,
        });
        //     var images = [];
        //     if(req.body.postType==='Image'){
        //     if(req.body.imageSubmission){

        //     req.body.imageSubmission.forEach(image=>{
        //         console.log("pushing images: "+image);
        //         images.push(image);
        //     });
        //     newPost.imageSubmission.concat(images);
        //     }
        // }

        const savedPost = await newPost.save();
        console.log("saved post: "+savedPost);      
        targetCommunity.posts = targetCommunity.posts.concat(savedPost._id);
        await targetCommunity.save();
        console.log("targetCommunity: "+targetCommunity);
        author.posts = author.posts.concat(savedPost._id);
        await author.save();  

        const populatedPost = await savedPost
          .populate('author', 'username')
          .populate('community', 'communityName')
          .execPopulate();      
        res.status(200).json(populatedPost);
      };

    // Get Posts
    const getPosts = async (req, res) => {
        console.log("in get posts API: "+req.body.type);
        const communityName = req.body.communityName;
        const postsCount = await Post.countDocuments();
        //console.log("Post.countDocuments(): "+postsCount);
        const com = await Community.findOne({communityName:communityName});
        switch (req.body.type) {
        // created at
        case 10:
        console.log("in case 10");
        if(req.body.sorted === true){
          const postsByComm = await Post.find({community:com._id}).sort({created_at : 1});
          if (postsByComm.length > 0) {
            console.log("sorted postcmms: "+postsByComm);
            return res.status(200).json(postsByComm);
          }
        }  else if(req.body.sorted === false){
          const postsByComm = await Post.find({community:com._id}).sort({created_at : -1});
          if (postsByComm.length > 0) {
            return res.status(200).json(postsByComm);
          }
        }
        break;
      //most popular
      case 20:
        console.log("in case 20");
        if(req.body.sorted === true){
          const postsByComm = await Post.find({community:com._id}).sort({noOfUpvotes : 1});
          if (postsByComm.length > 0) {
            return res.status(200).json(postsByComm);
          }
        }  else if(req.body.sorted === false){
          const postsByComm = await Post.find({community:com._id}).sort({noOfUpvotes : -1});
          if (postsByComm.length > 0) {
            return res.status(200).json(postsByComm);
          }
        }
        break;

      case 30:
        console.log("in case 30");
        if(req.body.sorted === true){
          const postsByComm = await Post.find({community:com._id}).sort({noOfDownvotes : 1});
          if (postsByComm.length > 0) {
            return res.status(200).json(postsByComm);
          }
        }  else if(req.body.sorted === false){
          const postsByComm = await Post.find({community:com._id}).sort({noOfDownvotes : -1});
          if (postsByComm.length > 0) {
            return res.status(200).json(postsByComm);
          }
        }
        break;
    
      default:
        console.log("this is default case");
        break;
      }
        // const com = await Community.findOne({communityName:req.body.communityName});
        // const postsByComm = await Post.find({community:com._id});
        // postsByComm.forEach(upvote=>{
        //   console.log("upvote:: "+upvote.upvotedBy);
        // })
        // res.status(200).json(postsByComm)
        }

        

      const getPost = async(req,res) =>{
        console.log("In Get Post API");
        const post = await Post.findById({_id:req.body.postId});
        if(post){
          console.log("Post: "+post);
          res.status(200).json(post);
        }
      }
      
      //upvote post
      const upvote = async (req,res) =>{
        console.log("In Upvote post API");
        const user = await UserProfile.findOne({email:req.body.email});
        var postId = req.body.postId;
        const post = await Post.findById({_id:postId});

        if (post.upvotedBy.includes(user._id.toString())) {
          post.upvotedBy = post.upvotedBy.filter(
            (u) => u.toString() !== user._id.toString()
          );
        } else {
          post.upvotedBy = post.upvotedBy.concat(user._id);
          post.downvotedBy = post.downvotedBy.filter(
            (d) => d.toString() !== user._id.toString()
          );
        }
        const points = post.upvotedBy.length - post.downvotedBy.length;
        if (post.points <= 0) {
          post.pointsCount = 0;
        } else {
          post.pointsCount = points;
        }
        post.noOfUpvotes = post.upvotedBy.length;
        post.noOfDownvotes = post.downvotedBy.length;
        await post.save();
        res.status(200).end();
      }

      //downvote post
      const downvote = async (req,res) =>{
        console.log("In Downvote post API");
        const user = await UserProfile.findOne({email:req.body.email});
        var postId = req.body.postId;
        const post = await Post.findById({_id:postId});

        if (post.downvotedBy.includes(user._id.toString())) {
          post.downvotedBy = post.downvotedBy.filter(
            (u) => u.toString() !== user._id.toString()
          );
      
        } else {
          post.downvotedBy = post.downvotedBy.concat(user._id);
          post.upvotedBy = post.upvotedBy.filter(
            (d) => d.toString() !== user._id.toString()
          );
        }
        const points = post.upvotedBy.length - post.downvotedBy.length;
        if (post.points <= 0) {
          post.pointsCount = 0;
        } else {
          post.pointsCount = points;
        }
        post.noOfUpvotes = post.upvotedBy.length;
        post.noOfDownvotes = post.downvotedBy.length;
        await post.save();
        res.status(200).end();
      }

    module.exports = {
        createnewpost,
        getPosts,
        getPost,
        upvote,
        downvote
    };
