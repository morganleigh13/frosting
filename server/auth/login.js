import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userModel from "../users/userModel.js";
const jwtSecret = process.env.JWT_SECRET || "secret";
const tokenExpiration = process.env.TOKEN_EXPIRATION || 60 * 60 * 24 * 1;

const createToken = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: tokenExpiration });
};

const login = async (req, res, next) => {
  const { _id } = req.user;
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: tokenExpiration,
    sameSite: "none",
    domain: "localhost",
    path: "/"
  }
  const token = { token: createToken({ _id }) };

  try {
    const user = await userModel.findOne({ _id });
    // console.log(token)
    if (user.tokens) {
      user.tokens.push(token);
    } else {
      user.tokens = [token];
    }
    user.save();
    res.cookie("token", token, cookieOptions)
    console.log(user)
    const loginUser = { firstName: user.firstName, lastName: user.lastName, email: user.email, tokens: [token], roles: user.roles, username: user.username, address: {
     ...user.address
    }, phone: user.phone }
    // console.log("login User", loginUser)
    res.status(200).json({ success: "login success", tokens: [token], user: loginUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error Please try again.", success: "negative" });
  }
};

export default login;
