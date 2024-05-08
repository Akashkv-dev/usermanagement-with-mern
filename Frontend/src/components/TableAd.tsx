import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { isEmpty } from "../helper/validation";
import { AddUser } from './AddUser';
import { useSelector } from "react-redux";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type createData = {
  _id: string;
  name: string;
  email: string;
  age: string;
};

export const TableAd = () => {
  const [user, setUser] = useState<createData[]>([]);
  const openAddUser =useSelector((store)=>store.addUser.addOpen)
  const [refresh,setRefresh] = useState<number>(0)
  const pageRefresh= ()=>{
    setRefresh(()=>refresh + 1)
  
  }

  const token = localStorage.getItem("admin");
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await axios.get(
          "http://localhost:3000/admin/dashboard",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response);
        setUser(response.data.users);
      };
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  },[refresh]);

  //edit*******
  const [openEdit,setOpenEdit]=useState<boolean>(false)
  const [editUser,setEditUser] =useState<{ name: string; id:string,value:string }>({
    name:"",
    id:"",
    value:""
  })
  const [editerr, setEditerr] = useState(false);
  const [editerrdef, setEditerrdef] = useState("");

  const handelEditOpen=(id: string)=>{
    
    const userToEdit =user.find((item)=>item._id == id);
    
    if(userToEdit){
      setOpenEdit(true)
    setEditUser({
      name:userToEdit.name,
      id:userToEdit._id,
      value:userToEdit.name
    })
    }
    else{
      console.error(`user with ${id} not found`);
      
    }

  }
  const editvalue = (event:ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEditUser((previous) => ({
      ...previous,
      value: value
    }));
  };
  const closeEditModal = () => {
    setOpenEdit(false);
    setEditerr(false)
    setEditerrdef("")
  };
  const handleEdit=()=>{
    if(isEmpty(editUser.value)){
      setEditerr(true);
      setEditerrdef("field can't be empty");
    }
    else{
      setEditerr(false);
      setEditerrdef("")
      axios.post("http://localhost:3000/admin/edituser",editUser,
      {
        headers: {
          Authorization: `${token}`,
        },
        
      }
      )
      .then((response)=>{
        console.log(response);
        setUser(response.data.users)
      })
      .catch((err)=>{
        if(err.response){
          setEditerr(true)
          setEditerrdef("edit not found")
        }
      })
      setOpenEdit(false);
      
    }
  }

  //delete user****
  const [openDelete,setOpenDelete]=useState<boolean>(false)
  const [deleteUserId,setDeleteUserId] =useState('')

  const handleDeleteOpen =(id: string)=>{
    setOpenDelete(true)
    setDeleteUserId(id)
    
  }
  const closeDeleteModal=()=>{
    setOpenDelete(false)
  }
  const handleDelete =()=>{
    axios.delete("http://localhost:3000/admin/deleteuser",{
      
        headers:{
          Authorization:`${token}`
          
        },
        data: {
          deleteUserId: deleteUserId 
        }
      }
    )
    .then((response)=>{{
      console.log(response);
           setUser(response.data.users)
           closeDeleteModal()
      
    }})
  }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.age}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="outlined" onClick={()=>handelEditOpen(user._id)} >EDIT</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="outlined" onClick={()=>handleDeleteOpen(user._id)} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

{openEdit && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div className="bg-black p-8 rounded-lg z-10 ">
      <h2 className="text-2xl font-bold mb-4">Edit User Name</h2>
      <label className="block mb-2">New Name:</label>
      <input
        type="text"
        value={editUser.value}
        onChange={editvalue}
        className="border px-4 py-2 mb-4 mr-3"
      />
      {editerr && <p className="text-red-500 mb-2">{editerrdef}</p>}
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Save
      </button>
      <button
        onClick={closeEditModal}
        className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
      >
        Cancel
      </button>
    </div>
  </div>
)}

{openDelete && (
  <div className="fixed inset-0 flex items-center justify-center">
  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  <div className="bg-black p-8 rounded-lg z-10 ">
    <p className="text-2xl font-bold mb-4">Are you confirm to delete user?</p>
    
    <button
       onClick={handleDelete}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      OK
    </button>
    <button
      onClick={closeDeleteModal}
      className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
    >
      Cancel
    </button>
  </div>
</div>
)}

  {openAddUser &&(
    <AddUser pageRefresh={pageRefresh}/>
  )}
</>

  );
};
