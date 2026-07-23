
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { authLogin, authLogout } from "./authSlice"
export const listenerMiddleware = createListenerMiddleware()
// Login
listenerMiddleware.startListening({
  matcher: isAnyOf(authLogin.fulfilled),
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware authLogin.fulfilled effect")
    const tokens = listenerApi.getState().auth.user.tokens
    localStorage.setItem("token", tokens[0].token)
  }
})
// AuthLogout
listenerMiddleware.startListening({
  matcher: isAnyOf(authLogout.fulfilled),
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware logout.fulfilled effect")
    localStorage.removeItem("token")
  }
})