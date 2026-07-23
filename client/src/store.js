import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'
import userReducer from './redux/userSlice'
import productReducer from './redux/productSlice'
import orderReducer from './redux/orderSlice'
import themeReducer from './redux/themeSlice'
import { listenerMiddleware } from './redux/localStorageMiddleware'


const preloadedState = () => {
    if (localStorage.getItem("token") !== null) {
      return {
        auth: {
          loading: true,
          isLoggedIn: true,
          user: { 
            tokens:[ {token: localStorage.getItem("token")}], 
            authToken: localStorage.getItem("token")
          }
        }
      }
    }
    return undefined
  }

export const store = configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
      products: productReducer,
      orders: orderReducer,
      themes: themeReducer
    },
    preloadedState: preloadedState(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware)
})