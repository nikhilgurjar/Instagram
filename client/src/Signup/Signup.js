import React,{useState} from 'react'
import {Redirect, useHistory} from "react-router-dom";
import {useFormik} from 'formik'
import {Link} from 'react-router-dom';
import './Combined.css'
const initialValues={
    email:'',
    fullname:'',
    username:'',
    password:''
}

const validate = values=> {
    const errors = {}
    if(!values.email){
        errors.email= "Required"
    }
    if(!values.password){errors.password="Required"
    }
    if(!values.username){
        errors.username="Required"
    }
    if(!values.fullname){
        errors.fullname="Required"
    }
    return errors;
}



export default function(){
    const history = useHistory()
const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const formik = useFormik({
        initialValues,
        validate
    })
    const submit = (e)=>{
        e.preventDefault()

        fetch("http://localhost:5000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    name,
                    password,
                    email
                }
            )

        }).then(res=>res.json()).then(
            data=>{console.log(data);
                var x = document.getElementById("snackbar");

                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            history.push("/login")
            }

        ).catch(err=>console.log(err))

    }

    return(
        <div className="signupoutercont">
        <div className="signupcont">
            <div className="logo">Instagram</div>
            <div class="signuptag">Sign up to see photos and videos from your friends.</div>
            <form>
                <input type="email"
                       id="email"
                       name="email"
                       placeholder="email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                />
                {formik.touched.email && formik.errors.email?<div className="error">{formik.errors.email}</div>:null}

                {console.log(email)}
                <input type="text"
                       id="email"
                       name="username"
                       placeholder="username"
                       {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username?<div className="error">{formik.errors.username}</div>:null}


                <input type="text"
                       id="email"
                       name="fullname"
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                       placeholder="fullname"
                />
                {formik.touched.fullname && formik.errors.fullname?<div className="error">{formik.errors.fullname}</div>:null}


                <input type="password"
                       id="email"
                       name="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       placeholder="password"
                />
                {formik.touched.password && formik.errors.password?<div className="error">{formik.errors.password}</div>:null}
                <button type="submit" onClick={submit}>Sign Up</button>
            </form>

            <p className="terms">by signing up you agree to our <a className="special">terms and conditions</a> and <a className="special">privacy policy</a></p>

            <div>Have an Account <Link to="/login">Login</Link></div>
        </div></div>
    )
}