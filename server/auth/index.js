import { Router } from "express";
import passport from "passport";
import login from "./login.js"
import logout from "./logout.js"
import me from "./me.js"
import update from "./update.js"

const index = Router()

index.post("/login", passport.authenticate("local"), login)
index.get('/me',passport.authenticate("jwt", { session: false }), me)
index.get("/logout", passport.authenticate("jwt", { session: false }), logout)
index.post("/update", passport.authenticate("jwt", { session: false }), update)


export default index