import axios from "axios";

const productService = {
  getAllProducts: async () => {
    return await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/products`);
  },
  getProductDetails: async (slug) => {
    return await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/products/${slug}`);
  },
};

export default productService;
