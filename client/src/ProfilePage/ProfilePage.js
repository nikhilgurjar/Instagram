import React,{useEffect,useState,useContext} from 'react'
import {Usercontext} from '../App'
import Gallary from "../Gallary/Gallary";
import './ProfilePage.css'
export default function(){
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(Usercontext)
    const [image,setImage] = useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/myposts',{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log(result)
               setPics(result.myposts)
            })
    },[])
   // useEffect(()=>{
      //  if(image){
            // const data = new FormData()
            // data.append("file",image)
            // data.append("upload_preset","instagram-clone")
            // data.append("cloud_name","nikhilgurjar")
            // fetch("https://api.cloudinary.com/v1_1/nikhilgurjar/image/upload",{
            //     method:"post",
            //     body:data
            // })
            //     .then(res=>res.json())
            //   //  .then(data=>{


                   // fetch('/updatepic',{
                   //      method:"put",
                   //      headers:{
                   //          "Content-Type":"application/json",
                   //          "Authorization":"Bearer "+localStorage.getItem("jwt")
                   //      },
                   //      body:JSON.stringify({
                   //          pic:data.url
                   //      })
                   //  }).then(res=>res.json())
                   //      .then(result=>{
                   //          console.log(result)
                   //          //localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                          //  dispatch({type:"UPDATEPIC",payload:result.pic})
                            //window.location.reload()
                //         })
                //
                // })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
    //     }
    // },[image])
   // const updatePhoto = (file)=>{
     //   setImage(file)
   // }

    return(

        <div>

            <header className="profilecont">
                <div className="profileimage"><img src={state?state.pic:"loading"} alt='' /> </div>
                <div className="infocont">
                    <div className="flexdiv">
                        <div className="namecont">
                            <div className="name">{state?(state.name?state.name:"loading"):"loading"}</div>

                        </div>
                        <div className="details">
                            <div>
                                {mypics.length}posts
                            </div>
                            <div>
                                {console.log(state)}
                                {state?(state.followers?state.followers.length:"0"):"0"} followers
                            </div>
                            <div>
                                {state?(state.following?state.following.length:"0"):"0"}
                                following
                            </div>
                        </div>
                        <div className="bio">
                            <span>Youngest Most Beautiful Woman in the Universe| Only Actor to win max no. of beauty titles in entire history ever|MissUniverseI|IITian|Theatre|Athlete|</span> </div>
                    </div>
                </div>
            </header>
            <div className="profilecontainer">
                <header><div className="profileimage" ><img src={state?state.pic:"loading"}  alt='' /> </div>
                    <div className="namecont"><div className="name">{state?state.name:"loading"}</div>

                    </div>

                </header>
                <div className="infocont">
                    <div className="flexdiv">

                        <div className="details">
                            <div>
                                {mypics.length} posts
                            </div>
                            <div>{state?state.followers:"0"} followers</div>
                            <div>{state?state.following:"0"} following</div>
                        </div>
                        <div className="bio"><span>Youngest Most Beautiful Woman in the Universe| Only Actor to win max no. of beauty titles in entire history ever|MissUniverseI|IITian|Theatre|Athlete|</span> </div>
                    </div>
                </div>
            </div>
            <div>
                <Gallary pic={mypics}/>
                {console.log(mypics)}
            </div>
        </div>
    )
}