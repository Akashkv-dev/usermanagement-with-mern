import React, { useState } from 'react'
import { isEmpty } from '../helper/validation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AdminLogin:React.FC = () => {
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [error,setError] =useState<string | null>(null)
const [showPassword,setShowPassword]=useState<boolean>(false)
const navigate = useNavigate()

const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    setError(null)
    if(isEmpty(email)){
        setError("enter the email")
        return
    }
    else if(isEmpty(password)){
        setError("enter the password")
        return
    }
    try {
        
            await axios.post(`http://localhost:3000/admin/login`,{email,password})
            .then((response)=>{
                if(response.status == 200 && response.data.token){
                    console.log(response);
                    const token=response.data.token
                    localStorage.setItem("admin",token)
                    navigate("/admin/dashboard");
                    
                }else{
                    console.log("error",response.status);
                }
            })
            .catch((error)=>{
                if(error.response){
                    console.log(error.response);
                    setError(error.response.data.message)
                    
                }
            })

        
        
    } catch (err) {
        console.error(err);
        
        
    }

}

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <div>
        <div className=" h-screen mx-auto'">
      <h1 className="text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10">
        Admin Login
      </h1>
      {error ? <div>{error}</div> : ""}
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col pt-10">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="rounded-md border-none w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="absolute text-xs inset-y-0 right-0 pr-2 flex items-center"
              onClick={toggleShowPassword}
            >
              {" "}
              {showPassword ? (
                <i className="fas fa-eye-slash fa-2x"></i>
              ) : (
                <i className="fas fa-eye fa-2x"></i>
              )}{" "}
            </button>
          </div>
          <button
            type="submit"
            className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}
