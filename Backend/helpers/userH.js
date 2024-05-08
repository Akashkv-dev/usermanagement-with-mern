const bcrypt = require("bcrypt");
const User = require("../modal/userSchema");
const Trash = require("../modal/trashSchema")


module.exports = {
  insert: async (data) => {
    try {
        const {name,email,password,age} = data
      const saltRounds = 10;

      const hashedpw=await bcrypt.hash(password, saltRounds);
      console.log(hashedpw);

      await User.insertMany({
        name:name,
        email:email,
        password:hashedpw,
        age:age
      });
    } catch (error) {
      console.log(error, "inserting error helper");
    }
  },
  findUser: async (Email) => {
    const user = await User.findOne({ email: Email });
    return user;
  },
  allUser:async ()=>{
    const users =await User.find().lean()
    return users
  },
  updateUser:async (id,value)=>{
    await User.findByIdAndUpdate(
      id,
      {name:value},
      {new:true}
    )
    return true;
  },
  deleteUser:async (Id)=>{
    console.log(Id);
    const trash =await User.deleteOne({_id:Id})
  },
  findUserbyId: async (id) => {
    const user = await User.findOne({ _id:id });
    return user;
  },
  insertTrash:async (Name,Email)=>{
    await Trash.insertMany({
      name:Name,
      email:Email
    })
    return true
  }
};
