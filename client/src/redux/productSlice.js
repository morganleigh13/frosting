import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  loading: true,
  error: null,
  success: "",
  products: [],
  product: {
    productName: "",
    description: "",
    images: [],
    thumbnail: "",
    price: 0,
    type: "",
    material: "",
    reviews: [],
  },

  authToken: {},
};

export const getAllProducts = createAsyncThunk("products/getMany", async () => {
  const response = await productService.getAllProducts();
  return response.data;
});
export const getProductDetails = createAsyncThunk(
  "products/getDetails",
  async ({slug}) => {
    const response = await productService.getProductDetails(slug);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    successState(state) {
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Get ALL products
      .addCase(getAllProducts.pending, (state, action) => {
        // console.log("getAllProducts.pending", action.payload);
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("getAllProducts.fulfilled", action.payload);
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log("getAllProducts.rejected", action.payload, action.error);
        state.loading = false;
      })
      // Get PRODUCT DETAILS
      .addCase(getProductDetails.pending, (state, action) => {
        // console.log("getProductDetails.pending", action.payload);
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("getProductDetails.fulfilled", action.payload);
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        console.log("getProductDetails.rejected", action.payload, action.error);
        state.loading = false;
      });
  },
});

export const { successState } = productSlice.actions;
export default productSlice.reducer;

// state.products = [...state.products, action.payload.product] for update