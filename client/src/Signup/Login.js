import React,{useState,useContext} from 'react'
import {useFormik} from 'formik'
import { Link,use,useHistory} from 'react-router-dom';
import {Usercontext} from "../App";
import { Redirect } from 'react-router';
import './Combined.css'

const initialValues={
    username:'',
    password:''
}
let loggedin = false;

const validate = values=> {
    const errors = {}

    if(!values.password){errors.password="Required"
    }
    if(!values.username){
        errors.username="Required"
    }

    return errors;
}
export default function(){
    const history = useHistory()
    const {state,dispatch} = useContext(Usercontext)
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("")
    const formik = useFormik({
        initialValues,
        validate
    })

    const submit = (e)=>{
        e.preventDefault()

        fetch("http://localhost:5000/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    password,
                    email
                }
            )

        }).then(res=>res.json()).then(
            data=>{
                if(data.err){
                    console.log(data.err)
                }else{

                    // Add the "show" class to DIV

                 console.log(data)
                    // After 3 seconds, remove the show class from DIV

                localStorage.setItem("JWT",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                console.log(data);
                history.push("/")

                }
            }

        ).catch(err=>console.log(err))

    }



    return(
        <div className="signupoutercont">
        <div className="signupcont">

            <div className="logo">Instagram</div>
            <form onSubmit={formik.handleSubmit}>
                <input type="text"
                       id="email"
                       value={email}
                       name="username"
                       onChange={(e)=>setEmail(e.target.value)}

                       placeholder="username"
                />
                {formik.touched.username && formik.errors.username?<div className="error">{formik.errors.username}</div>:null}

                <input type="password"
                       id="email"
                       value={password}
                       name="password"
                       placeholder="password"
                       onChange={(e)=>setPassword(e.target.value)}

                />
                {formik.touched.password && formik.errors.password?<div className="error">{formik.errors.password}</div>:null}
                <button type="submit" onClick={submit}>Login</button>
            </form>



            <div className="signuplink">Don't Have an Account <Link to="/signup">Signup</Link></div>
        </div></div>
    )
}