import userModel from "./userModel.js"

const userGetMany = async (req, res) => {
  const userList = await userModel.find()
  // console.log("userList", userList)
  res.status(200).json({ "success": true, users: userList })
}
export default userGetMany