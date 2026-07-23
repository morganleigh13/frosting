import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "", unique: true },
  username: { type: String, default: "", unique: true },
  password: { type: String, default: "" },
  roles: [String],
  authStrategy: { type: String, default: "" },
  tokens: [{ token: String }],
  securityQuestion: [
    {
      question: { type: String, default: "What is your favorite color?" },
      answer: String,
    },
  ],
  cart: [],
  address: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  phone: { type: String, default: "" },
});

export default userSchema;
