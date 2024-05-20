const bcrypt = require("bcrypt");
const User = require("../modal/userSchema");


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
      throw error;
    }
  },
  findUser: async (Email) => {
    const user = await User.findOne({ email: Email });
    return user;
  },
  updateUser:async (id,value)=>{
    await User.findByIdAndUpdate(
      id,
      {name:value},
      {new:true}
    )
    return true;
  },
  findUserbyId: async (id) => {
    const user = await User.findOne({ _id:id });
    return user;
  }

};
