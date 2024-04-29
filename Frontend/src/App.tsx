import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Loginpage } from './components/Loginpage'
import { Register } from './components/Register';
import { Home } from './components/Home'
import { AdminLogin } from './components/AdminLogin';
import { Dashboard } from './components/Dashboard'
import { Provider } from 'react-redux';
import appStore from './Redux/appStore';
import AdminAuth from './constants/Adminauth';
import { AdminBody } from './components/AdminBody';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />  
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={<AdminAuth><AdminBody/></AdminAuth>}/>
        </Routes>
      </Router>
  )
}

export default App
