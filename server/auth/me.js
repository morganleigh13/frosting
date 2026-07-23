import mongoose from "mongoose";
import userModel from "../users/userModel.js";


const me = async (req, res, next) => {
  const { _id, firstName, lastName, email, roles, username, cart, address, phone } = req.user
  // console.log(req.user)
  
const token = req.headers.authorization.split(" ")[1]
  try {
    const user = await userModel.findOne({ _id: _id });
   if(!user) {
    res.status(401).json({ message: "There was an error.", success: "negative" });
   }
   const loggedInUser = { firstName, lastName, email, roles, username, cart, _id, address, phone }
   
     res.status(200).json({user: loggedInUser, isLoggedIn: true, authToken: token, tokens: [{token: token}] });
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error.", success: "negative" });
  }
};

export default me;
 