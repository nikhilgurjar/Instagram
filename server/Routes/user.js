const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../Middleware/Requirelogin')
const User = mongoose.model("User")
const Post = mongoose.model("Post")
router.get('/user/:userid',(req,res)=>{
    console.log(req.params.userid)
   User.findOne({_id:req.params.userid})
        .select("-password") //we dont want password
        .then(user=>{
           Post.find({postedBy:req.params.userid})
                             .populate("postedBy","_id name")
               .exec((err,post)=>{
                   if(err){
                       return res.status(422).json({error:err})
                   }
                   res.json(user,post)
               })
        })
       .catch(err=>{
            return res.status(404).json({error:"user not found"});
   })
})
router.put("/follow",(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new:true},
        (err,res)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{
                following:req.body.followId
            }
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
        }
        )

})
router.put("/unfollow",(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
            $pull:{followers:req.user._id}
        },{new:true},
        (err,res)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
                $pull:{
                    following:req.body.unfollowId
                }
            },{new:true}).select("-password").then(result=>{
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({error:err})
            })
        }
    )

})

module.exports = router