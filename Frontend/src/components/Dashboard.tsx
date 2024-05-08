import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openAdduser } from '../Redux/adminSlice';

export const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const navigate=useNavigate()
  const dispatch =useDispatch();
  const tokenad=localStorage.getItem("admin")
        if(tokenad==null){
            navigate("/admin")
        }

const logout=()=>{
    localStorage.removeItem("admin")
    navigate("/admin")
}

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const clickAddUser =()=>{
    dispatch(openAdduser(true))
  }
 

  return (
    <>
    
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Button color="inherit" onClick={clickAddUser}>Adduser</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button>
            <ListItemText primary="Users"/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash"/>
          </ListItem>
        </List>
      </Drawer>
    </div>
    
    
    </>
  );
};
