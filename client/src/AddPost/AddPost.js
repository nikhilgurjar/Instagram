import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import {Redirect} from "react-router";
import './AddPost.css'
const initialValues={
    title:'',
    tags:'',
    photo:''
}

const onSubmit = values=>{
    console.log('form data',values)
}
const validate = values=> {
    const errors = {}



    if(!values.title || !values.tags){
        errors.error="at least one field required"
    }
    if(!values.photo){
        errors.photo="required"
    }
    return errors;
}
export default function(){
    const [title,setTitle] = useState("");
    const [tag,setTag] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("")

    useEffect(()=>{
        if(url) {
            fetch("http://localhost:5000/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("JWT")
                },
                body: JSON.stringify(
                    {
                        title,
                        tag,
                        pic: url
                    }
                )

            }).then(res => res.json()).then(
                data => {
                    console.log(data);
                }
            ).catch(err => console.log(err))
        }},[url])

const postdetails=()=>{
    const data = new FormData();
    data.append("file",image)
    data.append("upload_preset","Instagram-clone");
    data.append("cloud_name","nikhilgurjar")
    fetch("https://api.cloudinary.com/v1_1/nikhilgurjar/image/upload",{
        method:"post",
        body:data
    })
        .then(res=>res.json())
        .then((data)=>{
            setUrl(data.url)
        })
        .catch(err=>console.log(err))





    }




    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return(
        <div class="addpost">

            <form onSubmit={formik.handleSubmit}>
                <input type="text"
                       id="title"
                       name="title"
                       placeholder="title"
                       value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                />
                {formik.touched.title && formik.errors.error?<div className="error">{formik.errors.error}</div>:null}


                <input type="text"
                       id="tags"
                       name="tags"
                       placeholder="tags"
                       value={tag}
                       onChange={(e)=>setTag(e.target.value)}
                />
                {formik.touched.tags && formik.errors.error?<div className="error">{formik.errors.tags}</div>:null}




                <input type="file"
                       id="file"
                       name="photo"
                       accept="image/*,video/*,audio/*"
                       placeholder="photo"
onChange={(e)=>setImage(e.target.files[0])}
                />
                {formik.touched.photo && formik.errors.photo?<div className="error">{formik.errors.photo}</div>:null}
                <button type="submit" onClick={postdetails}>Post</button>
            </form>
        </div>
    )
}