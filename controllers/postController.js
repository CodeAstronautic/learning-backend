const Post = require('../models/postModel');

//create a post
exports.createPost = async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json({
            status:"success",
            message:"Post Created"
        })
    }catch(err){
        res.status(500).json(err)
    }
}
//get posts according to users
exports.getPost = async (req,res)=>{
    const post = await Post.find({userId:req.body.userId})
    try{
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
}      

//Update a post
exports.updatePost = async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
      if(post.userId===req.body.userId){
          await post.updateOne({$set:req.body})
        res.status(200).json({
            status:"Success",
            message:"You have successfully updated the post"
        })
      }    
      else{
          res.status(403).json("You don't have access to this")
      }
    }catch(err){
        res.status(500).json(err)
    }
}

//delete a post
exports.deletePost = async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.deleteOne()
            res.status(200).json({
                status:"Success",
                message:"you have successfully deleted the post"
            })
        }else{
            res.status(403).json("you can only delete your post")
        }
          
      }    
    catch(err){
        res.status(500).json(err)
    }
}

//Add tags in a post
exports.tagPosts = async (req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    await post.updateOne({$push:{tags:req.body.tag}})
    res.status(200).json({
        status:"Success",
        message:"You have added a tag to your post"})
    }catch(err){
   res.status(500).json(err)
    }
}

//comment on a post
exports.postComment = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        await post.update({$push:{comments:{text:req.body.text,username:req.body.username}}})
        //await post.updateOne({$push:{comments:{}}})
        res.status(200).json({
            status:"Success",
            message:"You have commented on this post"   
         })
        }catch(err){
       res.status(500).json(err)
        }
    }

//get comments of a post
    exports.getComment = async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            res.status(200).json(post.comments)
        }catch(err){
res.status(500).json(err)
        }
    }
   
