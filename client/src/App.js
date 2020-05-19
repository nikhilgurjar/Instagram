import React, {useEffect, createContext, useReducer, useContext} from "react";
import Navbar from './Navbar/Navbar'
import Login from './Signup/Login';
import Profile from './ProfilePage/ProfilePage';
import Signup from './Signup/Signup';
import AddPost from "./AddPost/AddPost";
import Home from "./Home/Home";
import ProfilePage from "./ProfilePage/ProfilePage";
import {BrowserRouter, Route, Router, Switch,useHistory} from 'react-router-dom'
import {reducer,initialstate} from './Reducers/userReducer'
import UserProfile from "./ProfilePage/UserProfile";
export const Usercontext = createContext()

const Routing = ()=>{
    const history = useHistory();
    const {state,dispatch} = useContext(Usercontext);
const user = localStorage.getItem("user");
    useEffect(()=>{
        if(user){
           dispatch({type:"USER",payload:user});
           console.log(state)
        }
        else{
            history.push('/login');
        }
    },[])
    return(<Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path='/signup' >
                <Signup/>
            </Route>
            <Route path='/login'
            ><Login/>
            </Route>
            <Route exact path='/profile' component={Profile} >
                <ProfilePage/>
            </Route>
            <Route path='/createpost' >
                <AddPost/>
            </Route>
            <Route path='/profile/:userid' >
                <UserProfile/>
            </Route>


        </Switch>
    )
}

export default function App() {
    const [state,dispatch] = useReducer(reducer,initialstate)
    return (
        <Usercontext.Provider value={{state,dispatch}}>
        <div className="App">
            <BrowserRouter>

                <Navbar/>
<Routing />


            </BrowserRouter>
        </div>
            </Usercontext.Provider>
    );
}
