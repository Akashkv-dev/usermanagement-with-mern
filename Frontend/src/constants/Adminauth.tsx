import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

interface AdminAuthProps extends RouteProps {
    children: React.ReactNode;
}

const AdminAuth:React.FC=({children}:AdminAuthProps)=>{

    const isLoggedIn=!!localStorage.getItem("admin");

    return isLoggedIn? children : <Navigate to="/admin" replace/>

};

export default AdminAuth;