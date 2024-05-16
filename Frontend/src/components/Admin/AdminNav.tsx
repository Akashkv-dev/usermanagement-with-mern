import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAdduser } from "../../Redux/adminSlice";
import { searchInput } from "../../Redux/adminSlice";
import { TextField } from "@mui/material";
// import { Search } from "@mui/icons-material";

export const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenad = localStorage.getItem("admin");
  if (tokenad == null) {
    navigate("/admin");
  }

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const clickAddUser = () => {
    dispatch(openAdduser(true));
  };
  const handleSearch =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const search =e.target.value.trim()
    console.log("handlesearch",search);
    dispatch(searchInput(search))

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
              <div className="flex items-center">
                <TextField
                  variant="outlined"
                  label="Search"
                  color="secondary"
                  size="small"
                  placeholder="Search users"
                  onChange={handleSearch}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white", // Border color
                      },
                      "& input": {
                        color: "white", // Text color
                      },
                      "&:hover fieldset": {
                        borderColor: "white", // Hovered border color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white", // Focused border color
                      },
                    },
                  }}
                />

                {/* <Button color="inherit">
                  <Search />
                </Button> */}
              </div>

              <Button color="inherit" onClick={clickAddUser}>
                Adduser
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
};
