import React, { useEffect } from "react";
import { useSelector, } from "react-redux";
import {  useNavigate } from "react-router-dom";

const ProtectedRoutes = ({Components})=>{
    const navigate=useNavigate();
    const initialLogIn=useSelector((state) => state.loginAuth.initialLogIn);
    console.log(initialLogIn);
    useEffect(()=>{
        if(!initialLogIn){
            console.log("mslsiyshsbstsphyakekoho   ", initialLogIn);
            navigate('/')
        }
    },[initialLogIn])
    if(!initialLogIn)return '';
    return(
        <div>
            <Components />
        </div>
    )
}
export default ProtectedRoutes