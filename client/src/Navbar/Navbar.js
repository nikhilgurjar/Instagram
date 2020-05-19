import React, {useContext} from 'react';
import '../App.css'
import {Link,NavLink,useHistory} from 'react-router-dom'
import {Usercontext} from "../App";

export default function Navbar({isauthenticated}){
    const history = useHistory()
    const {state,dispatch} = useContext(Usercontext)
    const renderList = ()=>{
        if(state){
            return [
                <NavLink to="/profile">Profile</NavLink>,
                <NavLink to="/createpost">Post</NavLink>,
                <button className="logout" type="submit" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}>LogOut</button>
            ]
        }else{
            return [
                <NavLink to="/signup">Signup</NavLink>,
                <NavLink to="/login">login</NavLink>
            ]
        }
    }
    return(
        <nav>
            <div className="leftnav">
                <NavLink to={state?"/":"/login"}>  <h3 className="logo">Instagram</h3></NavLink>
            </div>
            <div className="rightnav">
                {renderList()}
            </div>
        </nav>
    )
}