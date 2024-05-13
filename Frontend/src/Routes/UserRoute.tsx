import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  UserLogin  from '../pages/UserPage/UserLogin'
import  Home  from '../pages/UserPage/Home'
import UserSignup from "../pages/UserPage/UserSignup";
import { Error } from "../components/Error";


const UserRoute = () => {
  return (
    // <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserSignup />} />
          <Route path="/" element={<Home/>} /> 
          <Route path="*" element={<Error/>} /> 
        </Routes>
      /* </Router> */
  )
}

export default UserRoute