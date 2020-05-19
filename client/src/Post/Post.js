import React, {useContext, useState} from 'react'
import './Post.css'
import {Usercontext} from "../App";

import {BsChat} from 'react-icons/bs';
import {BsHeart} from 'react-icons/bs'
import {BsCursor} from 'react-icons/bs'
import {Link} from "react-router-dom";
export default function({item,Likehandler,Unlikehandler}){

    const {state,dispatcj} = useContext(Usercontext)

    return(
        <div className="postcont" key={item._id}>
            <h5 className="postedby"><Link to={`/profile/${item._id}`}>{item.postedBy.name}</Link></h5>
            <div className="imagecont">
                <img src={item.photo} alt='' />
            </div>
            <div>{item.title}</div>
            <div>{item.tag}</div>
            <div className="likecont">
                {item.likes.includes(state._id)?<div className="like"><BsHeart  onClick={()=>Unlikehandler(item._id)}/>
                </div>: <div className="like"><BsHeart  onClick={()=>Likehandler(item._id)}/>
                </div>
                }
                <div className="comment"><BsChat /></div>
                <div className="share"><BsCursor /></div>
            </div>
            <div className="nolikes">{item.likes.length} Likes</div>
        </div>
    )
}