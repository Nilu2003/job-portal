import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react'

const ProtectRoute = ({children,roleRequired}) => {
     const dispatch=useDispatch() 

 

    const {isLogged,role}=useSelector((state) => state.auth)

    // console.log("login-",isLogged);

    
    if(!isLogged){
        return <Navigate to="/login"/>;
       }
    if(roleRequired && role !== roleRequired){
        return <Navigate to="/"/>
    }
  return children;
}

export default ProtectRoute