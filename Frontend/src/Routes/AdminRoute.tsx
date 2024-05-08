import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import   AdminLogin  from '../pages/AdminPage/AdminLogin';
import AdminAuth from '../constants/Adminauth';
import AdminBody  from "../pages/AdminPage/AdminBody";


const AdminRoute = () => { 
  return (
    <Router>
        <Routes>
        <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={<AdminAuth><AdminBody/></AdminAuth>}/>
        </Routes>
    </Router>
  )
}

export default AdminRoute