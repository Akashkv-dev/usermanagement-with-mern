import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import   AdminLogin  from '../pages/AdminPage/AdminLogin';
import AdminAuth from '../constants/Adminauth';
import AdminBody  from "../pages/AdminPage/AdminBody";
import { Error } from "../components/Common/Error";


const AdminRoute = () => { 
  return (
    // <Router>
        <Routes>
        <Route path='/' element={<AdminLogin/>} />
          <Route path='/dashboard' element={<AdminAuth><AdminBody/></AdminAuth>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
    // </Router>
  )
}

export default AdminRoute