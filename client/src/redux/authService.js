import axios from "axios";
import { updateCart } from "./authSlice";


const authService = {
  authSignup: async (createForm) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/users`,
      createForm,
      { headers: { "Content-type": "application/json" } }
    );
  },
  authLogin: async (email, password) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/login`,
      { email, password },
      { withCredentials: true, headers: { "Content-type": "application/json" } }
    );
  },
  checkLogin: async (authToken) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/me`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  authLogout: async (authToken) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/logout`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  resetPassword: async (username, answer, password) => {
    return await axios.put(
      `${import.meta.env.VITE_API_SERVER_URL}/users/password`,
      { username, answer, password}
    );
  }, 
  updateCart: async ({product, operation, authToken}) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/update`,
     { product, operation },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }, 
}; 
export default authService;
