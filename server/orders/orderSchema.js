import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
user: {
    id: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
},
shippingAddress: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  payment: {
    cardNumber: String,
    expires: String,
    icing: Number,
    promo: Number,
    subtotal:Number,
    total: Number,
    street: String,
    city: String,
    state: String,
    zip: String
    },
  shipping: {
    date: {
      type: Date,
      default: new Date()
  },
  company: String,
  cost: String
  },
  items: [],

 
});

export default orderSchema;
