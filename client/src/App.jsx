import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Details from "./pages/Details";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails"
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const { authToken, loading, isLoggedIn, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("App user", user);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const checkToken = async () => {
        dispatch(checkLogin(token));
      };
      checkToken();
    }
  }, [authToken]);
  return (
    <div className="min-h-screen max-w-screen">
      <Toaster
        containerStyle={{
          top: 70,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 6000,
          removeDelay: 1000,

          // Default options for specific types
          success: {
            icon: "🎉",
            className:
              "text-lg text-success-content font-extrabold tracking-wider",
            style: {
              border: "4px solid green",
              backgroundColor: "var(--color-success)",
            },
          },
          error: {
            duration: 7000,
            icon: "💥👎",
            className:
              "text-lg text-error-content font-extrabold tracking-wider",
            style: {
              border: "4px solid red",
              backgroundColor: "var(--color-error)",
            },
          },
        }}
      />
      <Navbar />
      <div className="drawer min-h-screen">
        <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-hidden">        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:jewelry" element={<Products />} />
            <Route path="/products/:purse" element={<Products />} />
            <Route path="/:productSlug" element={<Details />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default App;
