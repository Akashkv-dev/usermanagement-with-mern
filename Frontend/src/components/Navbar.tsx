import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Navbar = () => {
  const navigate=useNavigate()
  const [user, setUser]=useState<string>('')
  useEffect(()=>{
    try {
      const fetchData=async ()=>{
        const token=localStorage.getItem( "token");
        // console.log(token);
        
       
        if(token){
          const response =await axios.get("http://localhost:3000/home",{
            headers:{
              Authorization:`${token}`
            }
          })
          // console.log(response);
          if(response.status==200){
            setUser(response.data.username)
          }

        }
      }
      fetchData();
    } catch (error) {
      console.error(error);
      
      
    }
  })

  const loggingOut =()=>{
    localStorage.removeItem('token')
      setUser('')
      navigate("/")
    
  }
  return (
    <div>
        <div>
        <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography >
            <div>
            {user? (
              <span>
                User:{user} <Button color="inherit" onClick={loggingOut}>Logout</Button>
              </span>
            ) : 
            (<Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>) }
            </div>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    </div>
    </div>
  )
}



