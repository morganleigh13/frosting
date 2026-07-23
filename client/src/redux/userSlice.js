import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";


const initialState = {
  loading: true,
  error: null,
  success: '',
  users: [],
  user: {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  },

  authToken: {}
};
// export const userGetOne = createAsyncThunk("users/getOne", async (id) => {
//   const response = await userService.userGetOne(id);
//   return response.data;
// });

export const usersGetMany = createAsyncThunk("users/getMany", async ({ authToken }) => {
    const response = await userService.usersGetMany(authToken);
    return response.data;
  });
  

  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      successState(state) {
        state.success = '';
      },
    },
    extraReducers: (builder) => {
      builder
        //createUser Signup

         // //Get ONE user
      // .addCase(userGetOne.pending, (state, action) => {
      //   console.log("usersGetOne.pending", action.payload);
      //   state.loading = true;
      // })
      // .addCase(userGetOne.fulfilled, (state, action) => {
      //   console.log("usersGetOne.fulfilled", action.payload);
      //   state.loading = false;
      //   state.isLoggedIn = true;
      //   state.user = action.payload.user;
      // })
      // .addCase(userGetOne.rejected, (state, action) => {
      //   console.log("usersGetOne.rejected", action.payload);
      //   state.loading = false;
      // })

      // Get ALL users
      .addCase(usersGetMany.pending, (state, action) => {
        console.log("usersGetMany.pending", action.payload);
        state.loading = true;
      })
      .addCase(usersGetMany.fulfilled, (state, action) => {
        console.log("usersGetMany.fulfilled", action.payload);
        state.loading = false;
        state.isLoggedIn = true;
        state.users = action.payload.users;
      })
      .addCase(usersGetMany.rejected, (state, action) => {
        console.log("usersGetMany.rejected", action.payload);
        state.loading = false;
      })

    },
});

export const { successState } = userSlice.actions;
export default userSlice.reducer;
