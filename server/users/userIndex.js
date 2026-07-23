import express from "express"
import userCreate from "./userCreate.js"
import userGetAll from "./userGetAll.js"
import userGetOne from "./userGetOne.js"
import resetPassword from "./resetPassword.js"

const userIndex = express.Router()

userIndex.post("/", userCreate)
userIndex.get("/", userGetAll)
userIndex.put("/password", resetPassword)
userIndex.get("/:id", userGetOne)

export default userIndex
