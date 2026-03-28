import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'

const ProtectRoute = ({children,roleRequired}) => {
    const {isLogged,role}=useSelector((state) => state.auth)
    if(!isLogged){
        return <Navigate to="/login"/>;
       }
    if(roleRequired && role !== roleRequired){
        return <Navigate to="/"/>
    }
  return children;
}

export default ProtectRoute