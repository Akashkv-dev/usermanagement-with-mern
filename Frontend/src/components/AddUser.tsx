import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeAdduser } from "../Redux/adminSlice";
import { isEmpty } from "../helper/validation";
import axios from "axios";


type userData = {
  name: string;
  email: string;
//   password: string;
  age: string;
};
type error = {
  namered: boolean;
  emailred: boolean;
//   passwordred: boolean;
  agered: boolean;
};
type errmsg = {
  nameerr: string;
  emailerr: string;
//   passworderr: string;
  ageerr: string;
};

export const AddUser = ({pageRefresh}) => {
  const [newUser, setNewUser] = useState<userData>({
    name: "",
    email: "",
    // password: "",
    age: "",
  });
  const [error, setError] = useState<error>({
    namered: false,
    emailred: false,
    // passwordred: false,
    agered: false,
  });
  const [errordef, seterrordef] = useState<errmsg>({
    emailerr: "",
    nameerr: "",
    // passworderr: "",
    ageerr: "",
  });
  const [existEmail,setExistEmail] = useState<string>("") 
  //dispatch action for close add user
  const dispatch =useDispatch()
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    // console.log(newUser);
  };
  const closeAddModal = () => {
    setNewUser({
      name: "",
      email: "",
    //   password: "",
      age: "",
    });
    dispatch(closeAdduser(false))
  };
  const addUser =()=>{
    const errors = {
        emailred: false,
        namered: false,
        // passwordred: false,
        agered: false
      };
  
      const errorMessages = {
        emailerr: "",
        nameerr: "",
        // passworderr: "",
        ageerr: "",
      };
    if(isEmpty(newUser.name)){
        errors.namered=true
        errorMessages.nameerr="Name can't be empty"
    }
    if(isEmpty(newUser.email)){
        errors.emailred=true
        errorMessages.emailerr="Email can't be empty"
    }
    // if(isEmpty(newUser.password)){
    //     errors.passwordred=true
    //     errorMessages.passworderr="Password can't be empty"
    // }
    if(isEmpty(newUser.age)){
        errors.agered=true
        errorMessages.ageerr="Age can't be empty"
    }
    setError(errors)
    seterrordef(errorMessages)
    // if(!error){
       const userAddApi= async ()=>{
            try {
                await axios.post('http://localhost:3000/admin/adduser',newUser)
                .then((response)=>{
                    if(response.status === 200){
                        console.log(response);
                        closeAddModal()
                        pageRefresh()
                        
                    }
                })
                .catch((error)=>{
                    if(error.response){
                        setExistEmail(error.response.data.message)
                    }
                })
                
            } catch (err) {
                console.error(err);
                
            }
        }
        userAddApi()
    // }
  }
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div
          className="bg-black p-8 rounded-lg z-10"
          style={{ width: "500px" }}
        >
          <h2 className="text-2xl font-bold mb-4">Add User</h2>

          <form action="">
            <div className="mb-4">
            <label className="block mb-2">Name:
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleAddChange}
              className={`border px-4 py-2 w-full ${
                error.namered ? "border-red-500" : ""
              }`}
            />
            </label>
            {error.namered && (
              <p className="text-red-500 mt-2">{errordef.nameerr}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email:
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleAddChange}
              className={`border px-4 py-2 w-full ${
                error.emailred ? "border-red-500" : ""
              }`}
            />
            </label>
            {error.emailred && (
              <p className="text-red-500 mt-2">{errordef.emailerr}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password:
            <input
              type="password"
              name="password"
              readOnly
              placeholder="autogenerate password"
            //   onChange={handleAddChange}
              className={`border px-4 py-2 w-full`}
            />
            </label>
            <p >(password is first 4 letter of email and age)</p>
            
          </div>

          <div className="mb-4">
            <label className="block mb-2">Age:
            <input
              type="number"
              name="age"
              value={newUser.age}
              onChange={handleAddChange}
              className={`border px-4 py-2 w-full ${
                error.agered ? "border-red-500" : ""
              }`}
            />
            </label>
            {error.agered && (
              <p className="text-red-500 mt-2">{errordef.ageerr}</p>
            )}
          </div>
          </form>

          <p className="text-red-500 mt-2">{existEmail}</p>

          <div className="flex">
            <button
                onClick={addUser}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            >
              Add User
            </button>
            <button
              onClick={closeAddModal}
              className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
