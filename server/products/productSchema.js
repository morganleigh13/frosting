import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, default: "" },
  description: { type: String, default: "" },
  images: [String],
  thumbnail: { type: String, default: "" },
  price: { type: Number, default: 0 },
  type: { type: String, default: "" },
  material: { type: String, default: "" },
  reviews: [],
  slug: { type: String, unique: true, index: true },
  
});

export default productSchema;
