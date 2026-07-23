import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../users/userModel.js";

const jwtSecret = process.env.JWT_SECRET || "secret";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  passReqToCallback: true
};

passport.use(
  new JwtStrategy(opts, async (req, jwtPayload, done) => {
    // console.log("jwtPayload", req.headers, req.headers.authorization.split(" ")[1], jwtPayload)
    try {
      const token = req.headers.authorization.split(" ")[1]
      // Find user based on _id in token, and make sure token is in users token list (i.e. logged in)
      const user = await userModel.findOne({ _id: jwtPayload._id, "tokens.token": token })
      // console.log(user)
      // if (!user || !user.tokens.find((t) => t.token === token)) {
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    }
    catch (err) {
      return done(err, null)
    }
  })
)

