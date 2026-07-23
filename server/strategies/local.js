import passport from "passport";
import { Strategy } from "passport-local";
import * as argon2 from "argon2"
import userModel from "../users/userModel.js";

passport.serializeUser((user, done) => {
  // no error = null, then grabbing the token out of the header
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await userModel.findOne({ _id: id });
    if (!findUser) {
      throw new Error("Invalid creds.");
    }
    done(null, findUser);
  } catch (err) {
    // passing error and returning null because there is no user.
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      // console.log("Local Strategy", username, password);
      const user = await userModel.findOne({ username: username });
      const isPasswordCorrect = await argon2.verify(user.password, password)
      // console.log("LSuser", isPasswordCorrect);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);
