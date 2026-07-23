import axios from "axios";

const orderService = {
  createOrder: async ({
    user,
    shippingAddress,
    payment,
    shipping,
    items,
    authToken,
  }) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/orders`,
      { user, shippingAddress, payment, shipping, items, authToken },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  getAllOrders: async () => {
    return await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/orders`);
  },
  getOrderDetails: async ({ orderId, authToken }) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/orders/details/${orderId}`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
  },
};

export default orderService;
