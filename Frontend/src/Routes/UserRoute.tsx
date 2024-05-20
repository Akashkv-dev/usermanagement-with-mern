import { Route, Routes } from "react-router-dom";
import  UserLogin  from '../pages/UserPage/UserLogin'
import  Home  from '../pages/UserPage/Home'
import UserSignup from "../pages/UserPage/UserSignup";
import { Error } from "../components/Common/Error";


const UserRoute = () => {
  return (
    // <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserSignup />} />
          <Route path="/home" element={<Home/>} /> 
          <Route path="*" element={<Error/>} />
        </Routes>
      /* </Router> */
  )
}

export default UserRoute