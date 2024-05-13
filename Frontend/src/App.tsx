import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminRoute from './Routes/AdminRoute'
import UserRoute from './Routes/UserRoute'



function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path='/*' element={<UserRoute />} />
          <Route path='/admin/*' element={<AdminRoute />}/>
        </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
