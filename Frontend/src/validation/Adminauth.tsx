import React from "react";
import { Navigate } from "react-router-dom";

interface AdminAuthProps {
    children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps>=({children})=>{

    const isLoggedIn=!!localStorage.getItem("admin");

    return isLoggedIn? children : <Navigate to="/admin" replace/>

};

export default AdminAuth;