import React, {useState, useEffect, useContext} from 'react'
import Post from "../Post/Post";
import {Usercontext} from "../App";

export default function () {
    const {state,dispatcj} = useContext(Usercontext)
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => res.json()).then(result => {
            setData(result)
       console.log(result)
        })
    },[])

    const likePost = (id)=>{
        fetch('https://localhost:5000/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
                //   console.log(result)
                const newData = data.map(item=>{
                    if(item._id===result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch('https://localhost:5000/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
                //   console.log(result)
                const newData = data.map(item=>{
                    if(item._id===result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{
            console.log(err)
        })
    }
return(
    <div>
        {
            data.map(item=>{
                return(
                    <Post item={item} Likehandler = {likePost} Unlikehandler={unlikePost}/>
                )
            })
        }
    </div>
)
}