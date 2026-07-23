import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "./redux/authSlice";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
  const { authToken, loading, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (token) {
      const token = localStorage.getItem("token");
      dispatch(checkLogin(token));
    }
  }, [token]);

if (isLoggedIn && token) {
    return <Outlet />;
  } else if (loading) {
    return <div>Loading</div>;
  } else {
    return <Navigate to='/login' />
  }
};

export default PrivateRoute;
