import { useEffect } from 'react'
import Loginpage from '../Common/Loginpage'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const adToken = localStorage.getItem('admin')
        if(adToken){
            navigate('/admin/dashboard')
        }
    },[])
  return (
    <div>
    <Loginpage head={'Admin Login'} loginType={'admin'} />
    </div>
  )
}

export default Login