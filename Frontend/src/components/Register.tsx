import {  useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isEmpty } from "../helper/validation";



type userData={
    name:string ;
    email:string ;
    password:string;
    age: string;
}

export const Register:React.FC = () => {

    const navigate =useNavigate()

    const [userData, setUserData] =useState<userData>({
        name:"",
        email:"",
        password:"",
        age: ""
    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setUserData({
            ...userData,
      [e.target.name]: e.target.value,

        })
    }
    const [error, setError] = useState<null | string>(null)
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const handleSubmit =async (e:React.FormEvent)=>{

        e.preventDefault();
        setError(null);

         //check the empty field
         if(isEmpty(userData.name) || isEmpty(userData.email) || isEmpty(userData.password) || isEmpty(userData.age)){
            setError("please fill in all fields")
            return
         }

            try {
                await axios.post('http://localhost:3000/signup',userData)
                .then((response)=>{
                    if(response.status===200){
                        console.log(response);
                        // alert(response.data.message)
                        navigate("/login")
                    }
                    else{
                       console.log("unhandled status code:",response.status);
                       
                    }                   
                })
                .catch((error)=>{
                    if(error.response){
                        console.log("error")
                        alert(error.response.data.message)
                    }
                    else if(error.request){
                        console.error("no response from server")
                    }
                    else{
                        console.error("request error")
                    }
                })
                
            } catch (err) {
                console.error(err)
                
    
            }
            
        }
        
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className=" h-screen mx-auto'">
      <h1 className="text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10">
        Register
      </h1>
      {error ? <div>{error}</div> : ""}
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col pt-10">
        <label htmlFor="email" className="text-white">
            Name
          </label>
          <input
            type="text"
            className="border-none mb-3 rounded-md"
            onChange={handleChange}
            name="name"
          />
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            className="border-none mb-3 rounded-md"
            onChange={handleChange}
            name="email"
            autoComplete="email"
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="rounded-md border-none w-full mb-3"
              onChange={handleChange}
              name="password"
            />
            <button
              type="button"
              className="absolute text-xs inset-y-0 right-0 pr-2 flex"
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
          <label htmlFor="age" className="text-white">
            Age
          </label>
          <input
            type="number"
            className="border-none mb-3 rounded-md"
            onChange={handleChange}
            name="age"
          />
          <button
            type="submit"
            className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white"
            onClick={handleSubmit}
          >
            Register
          </button>
          <p className="mt-2 text-gray-600 cursor-pointer">
              Already have an account?{" "}
              <span
                className="text-blue-700"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
        </div>
      </form>
    </div>
  )
}
