import axios from "axios";

const userService = {
    usersGetMany: async (authToken) => {
        return await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/user
              `,
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      },
}
export default userService