import express from "express"
import productCreate from "./productCreate.js"
import productGetAll from "./productGetAll.js"
import productGetOne from "./productGetOne.js"


const productIndex = express.Router()

productIndex.post("/", productCreate)
productIndex.get("/", productGetAll)
productIndex.get("/:slug", productGetOne)

export default productIndex
