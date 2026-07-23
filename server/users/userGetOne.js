import userModel from "./userModel.js"

const userGetOne = async (req, res) => {
    const { id } = req.params

  const user = await userModel.find({ _id: id})
  // console.log("user", user)
  res.status(200).json({ "success": true, user: user })
}
export default userGetOne