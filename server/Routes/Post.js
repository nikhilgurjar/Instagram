const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../Middleware/Requirelogin')
const Posts = mongoose.model("Post")
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,tag,pic} = req.body
    if(!title || !tag || !pic){
        return res.status(422).json({error:"please add all the fields"})
    }
    console.log(req.user);
    req.user.password = undefined  //to not show password
    const post = new Posts({
        title,
       tag,
        photo:pic,
        postedBy:req.user
   })
    post.save()
        .then(result=>{
            res.json({post:result})
        })
        .catch(err=>console.log(err)
        )
})
router.get('/allposts',requireLogin,(req,res)=>{
   Posts.find()
     //this will find all posts
        .populate("postedBy","_id name")
        .then(posts=>{
            res.json(posts)
        })
        .catch(err=>console.log(err))
})
router.get('/subscribedby',requireLogin,(req,res)=>{
    Posts.find({postedBy:{$in:req.user.following}})
        //this will find all posts
        .populate("postedBy","_id name")
        .then(posts=>{
            res.json(posts)
        })
        .catch(err=>console.log(err))
})

router.get('/myposts',requireLogin,(req,res)=>{
    Posts.find({postedBy: req.user._id})
        .populate("postedBy","_id name")
        .then(myposts=>{
            res.json({myposts})
        })
        .catch(err=>console.log(err))
})
router.put("/like",requireLogin,(req,res)=>[
    Posts.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            console.log(err)
            return res.status(422).json({err:err})
        }
        else{
            console.log(result)
            return res.json(result)
        }
    })
])
router.put("/unlike",requireLogin,(req,res)=>[
    Posts.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({err:err})
        }
        else{
            return res.json(result)
        }
    })
])

module.exports=router;

//before adding populate method what happening was postedBy is just an id so we have to expand that see all details of it