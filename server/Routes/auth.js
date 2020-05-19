const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  //to hash password
const User = mongoose.model('User');
const jwt  = require('jsonwebtoken');
const {JWT_SECRET} = require('../Keys')
router.get("/",(req,res)=>{
    res.send("hello")
});
router.post('/signup',(req,res)=>{
const {name,email,password}=req.body
    console.log(req.body)
    if(!email || !password || !name){
       return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email})
        .then((saveduser)=>
        {
            if(saveduser){
               return  res.status(422).json({error:"User already Exists  with this email address"})
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {

                    const user = new User({
                        email,
                        password:hash,
                        name
                    })
                    user
                        .save()
                        .then(user => {
res.json({message:"succes"})
                           // res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                });
            });


        })
        .catch(err=>{
            console.log(err)
        })
});
router.post('/signin',(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    if(!email || !password){
        res.status(422).json({error:"please fill all details"})
    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser) {
            return res.status(422).json({error: "invalid email or password"})
        }
         bcrypt.compare(password,saveduser.password)
             .then(domatch=>{
                 if(domatch){
                     //res.json({message: "succefully signin"})
                     const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
                     const {_id,name,email,following,followers} = saveduser;
                     res.json({token,user:{_id,name,email,following,followers}});
                 }
                 else{
                    return res.json({err:"invalid email or adress"});
                 }
             })
             .catch(err=>{
                 console.log(err)
             })


    })
})

module.exports = router;

//autherization:bearer token