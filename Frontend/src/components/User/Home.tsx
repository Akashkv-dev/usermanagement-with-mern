import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { News } from './News'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate =useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(!token){
      navigate('/')
    }
    
  },[])

  return (
    <div>
        <Navbar/>
        <News />
    </div>
  )
}
