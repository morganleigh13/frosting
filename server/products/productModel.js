import mongoose from "mongoose"
import productSchema from "./productSchema.js"

productSchema.set("toJSON", {
transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}
})

const productModel = mongoose.model("products", productSchema)

export default productModel