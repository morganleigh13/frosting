import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import moment from "moment";

const initialState = {
  loading: true,
  error: null,
  success: "",
  users: [],
  user: {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    tokens: [],
    username: "",
    cart: [],
    checkout:{
      user: {},
      shippingAddress: {},
      payment: {}
    },
    error: []
  },
  isLoggedIn: false,
  isAdmin: false,
  authToken: {},
  showCardNumber: false
};
export const authSignup = createAsyncThunk(
  "auth/create",
  async (createForm) => {
    const response = await authService.authSignup(createForm);
    return response.data;
  }
);

export const authLogin = createAsyncThunk("auth/login", async (credentails) => {
  const { email, password } = credentails;
  const response = await authService.authLogin(email, password);

  return response.data;
});
export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (authToken) => {
    const response = await authService.checkLogin(authToken);
    return response.data;
  }
);

export const authLogout = createAsyncThunk("auth/logout", async (authToken) => {
  const response = await authService.authLogout(authToken);

  return response.data;
});

export const resetPassword = createAsyncThunk("auth/password", async (data) => {
  const { username, answer, password } = data;
  const response = await authService.resetPassword(username, answer, password);
  return response.data;
});

export const updateCart = createAsyncThunk(
  "auth/update",
  async ({ product, operation, authToken }) => {
    const response = await authService.updateCart({
      product,
      operation,
      authToken,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    successState(state) {
      state.success = "";
    },
    setCheckoutForm(state, action){
      state.user.checkout = {...state.checkout, ...action.payload.checkout}
    },
    toggleCreditCard(state, action){
      state.showCardNumber = !state.showCardNumber     
    },
     clearCart(state) {
      console.log("clearing cart??", state.user.cart)
      state.user.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //createUser Signup
      .addCase(authSignup.pending, (state, action) => {
        console.log("createUser pending", state, action.payload);
        state.loading = true;
        state.success = "";
        state.error = null;
      })
      .addCase(authSignup.fulfilled, (state, action) => {
        console.log("createUser fulfilled", state, action.payload);
        if (action.payload.success === "negative") {
          state.loading = true;
          state.success = action.payload.success;
          state.error = action.payload.error;
          state.authToken = null;
        } else {
          state.loading = false;
          state.success = action.payload.success;
          state.error = null;
          state.user = action.payload.user;
          state.authToken = null;
        }
      })
      .addCase(authSignup.rejected, (state, action) => {
        console.log("createUser rejected", state, action.payload);
        state.loading = false;
        state.success = "negative";
        state.error = action.error.message ?? "Unknown Error";
        state.authToken = {};
      })

      // Login
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true;
        state.isAdmin = undefined;
        state.isLoggedIn = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log("authLogin.fulfilled", action.payload);
        state.loading = false;
        state.success = action.payload.success;
        state.authToken = action.payload.tokens[0].token;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        // if (state.user.roles.includes("admin")) {
        //   state.isAdmin = true;
        // } else {
        //   state.isAdmin = false;
        // }
        state.error = "";
        localStorage.removeItem("logout");
      })
      .addCase(authLogin.rejected, (state, action) => {
        console.log();
        state.loading = false;
        state.success = "negative";
        state.isLoggedIn = false;
        state.isAdmin = undefined;
        state.authToken = {};
        state.error = action.error.message ?? "Unknown error";
      })

      // Check login
      .addCase(checkLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        // console.log("authSlice checkLogin fulfilled", action.payload);
        state.loading = false;
        state.isLoggedIn = true;
        state.authToken = action.payload.authToken;
        state.user = { ...action.payload.user };
      })
      .addCase(checkLogin.rejected, (state, action) => {
        console.log("authSlice checkLogin rejected", action.payload);
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message ?? "Unknown Error";
        console.log(action.error);
      })

      // Logout
      .addCase(authLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        console.log("authSlice authLogout fulfilled", action.payload);
        state.loading = false;
        state.isLoggedIn = false;
        state.success = action.payload.success;
        state.user = {
          firstName: "",
          lastName: "",
          email: "",
          roles: [],
          tokens: [],
          username: "",
        };
        state.authToken = {};
        localStorage.removeItem("token");
        localStorage.setItem("logout", moment(Date.now()));
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown Error";
      })
      //Reset password
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log("authSlice resetPassword fulfilled", action.payload);
        state.loading = false;
        state.user = { ...action.payload.user };
        state.success = "password updated";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log("authSlice resetPassword rejected", action.payload);
        state.loading = false;
        state.success = "negative";
        state.error = action.error.message ?? "Unknown Error";
      })
      // update
      .addCase(updateCart.pending, (state, action) => {
        // console.log("updateCart.pending", action.payload);
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        console.log("updateCart.fulfilled", action.payload);
        state.isLoggedIn = true;
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateCart.rejected, (state, action) => {
        console.log("updateCart.rejected", action.payload, action.error);
        state.loading = false;
      });
  },
});
export const { successState, setCheckoutForm, toggleCreditCard, clearCart } = authSlice.actions;
export default authSlice.reducer;
