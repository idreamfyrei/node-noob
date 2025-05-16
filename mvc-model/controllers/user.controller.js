import User from "../models/user.model.js";

async function getAllUser(req,res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function getUserByID(req,res){
    const user = await User.findById(req.params.id);
    res.send(user);
}
async function patchUserByID(req,res){
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: 'Chatko'});
    return res.json({status:'Success'});
}
async function deleteUserByID(req,res){
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({status:'Deleted'});
}
async function postUserByID(req,res){
    const body = req.body;
  
    if (!body.first_name || !body.last_name || !body.email) {
      return res.status(400).json({ msg: "All inputs are required" });
    }
  
    try {
      const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
      });
      console.log("User created:", result);
      return res.status(201).json({ msg: "Success" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
}

export {getAllUser, getUserByID, patchUserByID, deleteUserByID, postUserByID};
