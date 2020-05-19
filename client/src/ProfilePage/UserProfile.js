import React,{useEffect,useState,useContext} from 'react'
import {Usercontext} from '../App'
import './ProfilePage.css'
import Gallary from "../Gallary/Gallary";
import {useParams} from 'react-router-dom'
export default function(){
    const [userProfile,setProfile] = useState(null)

    const {state,dispatch} = useContext(Usercontext)
    const {userid} = useParams()
   // state?!state.following.includes(userid)
    const [showfollow,setShowFollow] = useState(true)

    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userid}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log(result)

                setProfile(result)
            }).catch(err=> {
            console.log(err)
        console.log("error")})
    },[])


    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
            .then(data=>{

                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:[...prevState.user.followers,data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
            .then(data=>{

                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))

                setProfile((prevState)=>{
                    const newFollower = prevState.user.followers.filter(item=>item != data._id )
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:newFollower
                        }
                    }
                })
                setShowFollow(true)

            })
    }

    console.log(userProfile)

    return(
       <> {userProfile?<div>
           <header className="profilecont">
           <div className="profileimage"><img src='https://images.unsplash.com/photo-1586848485801-a59c4669648b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' /> </div>
           <div className="infocont">
           <div className="flexdiv">
           <div className="namecont">
           <div className="name">{state?state.name:"loading...."}</div>
           <div className="followbutton">
           {showfollow?
               <button className="follow" onClick={followUser}>Follow</button>
               :
               <button className="follow" onClick={unfollowUser}>unFollow</button>
           }

           </div>
           </div>
           <div className="details">
           <div>
            posts
           </div>
           <div>
           {userProfile.user.followers.length} followers
           </div>
           <div>
           {userProfile.user.following.length} following
           </div>
           </div>
           <div className="bio">
           <span>Youngest Most Beautiful Woman in the Universe| Only Actor to win max no. of beauty titles in entire history ever|MissUniverseI|IITian|Theatre|Athlete|</span> </div>
           </div>
           </div>
           </header>
           <div className="profilecontainer">
           <header><div className="profileimage"><img src='https://images.unsplash.com/photo-1586848485801-a59c4669648b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' /> </div>
           <div className="namecont"><div className="name">{state?state.name:"loading...."}</div>
           <div className="followbutton">
           {showfollow?
               <button className="follow" onClick={followUser}>Follow</button>
               :
               <button className="follow" onClick={unfollowUser}>unFollow</button>
           }

           </div>
           </div>

           </header>
           <div className="infocont">
           <div className="flexdiv">

           <div className="details">
           <div>
            posts
           </div>
           <div> {userProfile.user.followers.length} followers
           </div>
           <div>{userProfile.user.following.length} following</div>
           </div>
           <div className="bio"><span>Youngest Most Beautiful Woman in the Universe| Only Actor to win max no. of beauty titles in entire history ever|MissUniverseI|IITian|Theatre|Athlete|</span> </div>
           </div>
           </div>
           </div>
           <div>
           <Gallary pic={userProfile.posts}/>
           </div>
           </div>:"Loading...."}
    </>)
}