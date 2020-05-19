const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
    tag:{
    type:String,
        required: true
    },
    photo:{
    type:String,
        required:true
    },
    likes:[
        {
            type:ObjectId,ref:"User"
        }
    ],
    postedBy:{
    type:ObjectId,  //this will be the id of the user and this will referred to user model
        ref:"User"  //we established relationship

    }
})
mongoose.model("Post",postSchema);