const Admin = require("../modal/adminSchema");
const User = require("../modal/userSchema");

module.exports ={
    findAdmin:async (email)=>{
        await Admin.findOne({ email: email });
    },
    allUser:async ()=>{
      const users =await User.find().lean()
      return users
    },
    searchingUser:async (search) => {
      const nameRegex = new RegExp(search, 'i');
      const data = await User.find({ name: nameRegex });
      console.log(data);
      return data;
  }

}