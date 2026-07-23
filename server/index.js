import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./strategies/local.js";
import "./strategies/jwt.js";
import authIndex from "./auth/index.js"
import userIndex from "./users/userIndex.js";
import productIndex from "./products/productIndex.js";
import orderIndex from "./orders/orderIndex.js";


const app = express();
app.use(express.json());
const port = process.env.PORT || 8066;
const cookieSecret = process.env.COOKIE_SECRET || "secret"
const sessionSecret = process.env.SESSION_SECRET || "secret";
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

//So frontend can connect to the backend
app.use(cookieParser(cookieSecret));
//Set Express CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.disable("x-powered-by");
app.use(
  session({ secret: sessionSecret, resave: false, saveUninitialized: true })
);
// Add Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello Login World!");
});

app.use("/auth", authIndex)
app.use("/users", userIndex)
app.use("/products", productIndex)
app.use("/orders", orderIndex)

try {
  const mongoURI = process.env.MONGO_URI || "";
  await mongoose.connect(mongoURI);
  console.log(`Frosting connected to database @ ${mongoURI}`);
  app.listen(port, () => {
    console.log(`Frosting app listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
}
