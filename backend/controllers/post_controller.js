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
         ...validatedFields,
        });
            var images = [];
            if(req.body.postType==='Image'){
            if(req.body.imageSubmission){

            req.body.imageSubmission.forEach(image=>{
                console.log("pushing images: "+image);
                images.push(image);
            });
            newPost.imageSubmission.concat(images);
            }
        }

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
        const communityName = req.query.communityName;
        //const page = Number(req.query.page);
        //const limit = Number(req.query.limit);
        //const sortBy = req.query.sortby;
        // let sortQuery;
        // switch (sortBy) {
        //   case 'new':
        //     sortQuery = { createdAt: -1 };
        //     break;
        //   case 'top':
        //     sortQuery = { pointsCount: -1 };
        //     break;
        //   case 'best':
        //     sortQuery = { voteRatio: -1 };
        //     break;
        //   case 'old':
        //     sortQuery = { createdAt: 1 };
        //     break;
        //   default:
        //     sortQuery = {};
        // }      
        const postsCount = await Post.countDocuments();
        //const paginated = paginateResults(page, limit, postsCount);
        const com = await Community.findOne({communityName:req.query.communityName});
        //console.log("com: "+com);
        // const allPosts = await Post.findOne({community:com._id})
        //   .sort(sortQuery)
        //   .select('-comments')
        //   .limit(limit)
        //   .skip(paginated.startIndex)
        //   .populate('author', 'username')
        //   .populate('community', 'communityName');

        const postsByComm = await Post.find({community:com._id});
        console.log("postsByComm:: "+postsByComm);
        // console.log("all posts::"+allPosts);
        // const paginatedPosts = {
        //   previous: paginated.results.previous,
        //   results: allPosts,
        //   next: paginated.results.next,
        // };      
        // res.status(200).json(paginatedPosts);
        res.status(200).json(postsByComm)
      };
      
      //upvote post
      const upvote = async (req,res) =>{
        console.log("In Upvote post API");
        const user = await UserProfile.findOne({email:req.body.email});
        var postId = user.posts[0];
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
        await post.save();
        res.status(200).end();
      }

      //downvote post
      const downvote = async (req,res) =>{
        console.log("In Downvote post API");
        const user = await UserProfile.findOne({email:req.body.email});
        var postId = user.posts[0];
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
        await post.save();
        res.status(200).end();
      }

    module.exports = {
        createnewpost,
        getPosts,
        upvote,
        downvote
    };
