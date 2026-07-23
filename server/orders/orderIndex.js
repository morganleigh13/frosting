import express from "express"
import orderCreate from "./orderCreate.js"
import orderGetAll from "./orderGetAll.js"
import orderGetOne from "./orderGetOne.js"



const orderIndex = express.Router()

orderIndex.post("/", orderCreate)
orderIndex.get("/", orderGetAll)
orderIndex.get("/details/:orderId", orderGetOne)

export default orderIndex
