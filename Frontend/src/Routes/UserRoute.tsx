import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  UserLogin  from '../pages/UserPage/UserLogin'
import  Home  from '../pages/UserPage/Home'
import UserSignup from "../pages/UserPage/UserSignup";

const UserRoute = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserSignup />} />
          <Route path="/" element={<Home/>} />  
        </Routes>
      </Router>
  )
}

export default UserRoute