import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { clearCart } from "./authSlice";

const initialState = {
  loading: true,
  error: null,
  success: "",
  orders: [],
  order: {},
};

export const createOrder = createAsyncThunk("orders/create", async ({user, shippingAddress, payment, shipping, items, authToken}, thunkAPI) => {
  const { dispatch } = thunkAPI;
    const response = await orderService.createOrder({user, shippingAddress, payment, shipping, items, authToken})
    dispatch(clearCart())
    return response.data
})

export const getAllOrders = createAsyncThunk("orders/getMany", async () => {
  const response = await orderService.getAllOrders();
  return response.data;
});
export const getOrderDetails = createAsyncThunk(
  "orders/getDetails",
  async ({orderId, authToken}) => {
    const response = await orderService.getOrderDetails({orderId, authToken});
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    successState(state) {
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder

    // CREATE order
    .addCase(createOrder.pending, (state, action) => {
        // console.log("createOrder.pending", action.payload);
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("createOrder.fulfilled", action.payload);
        state.loading = false;
        state.success = action.payload.success
        state.order = action.payload.order;
        state.orders.push(action.payload.order) 
       
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log("createOrder.rejected", action.payload, action.error);
        state.loading = false;
      })
      // Get ALL orders
      .addCase(getAllOrders.pending, (state, action) => {
        // console.log("getAllOrders.pending", action.payload);
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        console.log("getAllOrders.fulfilled", action.payload);
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        console.log("getAllOrders.rejected", action.payload, action.error);
        state.loading = false;
      })
      // Get ORDER DETAILS
      .addCase(getOrderDetails.pending, (state, action) => {
        // console.log("getOrderDetails.pending", action.payload);
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log("getOrderDetails.fulfilled", action.payload);
        state.order = action.payload.order;
        state.success = action.payload.success
        state.loading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        console.log("getOrderDetails.rejected", action.payload, action.error);
        state.loading = false;
      })
  },
});

export const { successState } = orderSlice.actions;
export default orderSlice.reducer;

// state.orders = [...state.orders, action.payload.order] for update