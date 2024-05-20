const Admin = require("../modal/adminSchema");
const User = require("../modal/userSchema");

module.exports = {
  findAdmin: async (email) => {
    const admin = await Admin.findOne({ email: email });
    return admin;
  },
  allUser: async () => {
    const users = await User.find({active:true}).lean();
    return users;
  },
  searchingUser: async (search) => {
    const nameRegex = new RegExp(search, "i");
    const data = await User.find({ name: nameRegex });
    // console.log(data);
    return data;
  },
  unActive: async (Id) => {
    try {
      await User.findByIdAndUpdate(Id, { active: false }, { new: true });
    } catch (error) {
      console.error(error);
    }
  },
};
