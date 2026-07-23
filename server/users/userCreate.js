import * as argon2 from "argon2"
import userModel from "./userModel.js"
const userCreate = async (req, res) => {
  const { firstName, lastName, email, username, password, answer, roles, address, phone } = req.body

  if (
    (!firstName || firstName == "") || 
    (!lastName || lastName == "") || 
    (!email || email == "") || 
    (!username || username == "") || 
    (!password || password == "") ||
    (!answer || answer == "")
  ) {
    res.status(500).json({ "message": "User information not valid.", success: 'negative' })
  }
  else {
    const encryptedPassword = await argon2.hash(password)
    const encrytedAnswer = await argon2.hash(answer)
    const newUser = await userModel.create({ firstName, lastName, email, username, password: encryptedPassword, securityQuestion:[{ answer: encrytedAnswer}], authStrategy: "local", tokens: [], roles, address, phone })
    res.status(200).json({ success: "user created", "message": "User created.", user: newUser})
  }
}
export default userCreate