import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authLogout, successState } from "../redux/authSlice";
import { setTheme } from "../redux/themeSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isLoggedIn, authToken, success } = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.themes.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success === "logout successful") {
      toast.success(`Logged out.`);
      dispatch(successState());
    }
  }, [success]);

  const handleTheme = (t) => {
    dispatch(setTheme(t));
  };

  // may need to grab token out of local storage and pass it back that way?? Depends
  const logout = () => {
    dispatch(authLogout(authToken));
  };

  return (
    <div className="navbar bg-secondary shadow-sm fancy tracking-widest z-100">
      <div className="navbar-start py-3">
        <p
          onClick={() => navigate("/")}
          className="btn btn-ghost text-5xl fancy tracking-widest text-neutral"
        >
          Frosting
        </p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavLink to="/products/jewelry">
          <button className="btn font-bold text-3xl ms-2">Jewelry</button>
        </NavLink>
        <NavLink to="/products/purse">
          <button className="btn font-bold text-3xl ms-2">Purses</button>
        </NavLink>
        <NavLink to="/products">
          <button className="btn font-bold text-3xl ms-2">Everything</button>
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 font-bold text-3xl"
          >
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content bg-base-300 rounded-box z-1 w-fit p-2 shadow-2xl font-bold text-3xl mt-4 justify-center flex absolute lg:right-30 lg:-top-5 flex-col gap-3 right-10"
          >
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Frosting"
                value="frosting"
              />
            </li>
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Vanilla Frosting"
                value="vanilla"
              />
            </li>
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
              />
            </li>
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
              />
            </li>
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Valentine"
                value="valentine"
              />
            </li>
            <li>
              <input
                onClick={(e) => handleTheme(e.target.value)}
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn text-lg btn-block btn-ghost justify-start"
                aria-label="Aqua"
                value="aqua"
              />
            </li>
          </ul>
        </div>
        {isLoggedIn && (
          <NavLink to="/dashboard">
            <button className="btn font-bold text-3xl ms-2">Dashboard</button>
          </NavLink>
        )}
        {isLoggedIn ? (
          <label
            htmlFor="cart-drawer"
            className="
   cursor-pointer text-base-content
  font-bold rounded-xl
   overflow-hidden p-1 "
          >
            <p className="btn font-bold text-3xl ms-2">Cart</p>
          </label>
        ): (
          <NavLink to="/signup">
          <button className="btn font-bold text-3xl ms-3">Signup</button>
        </NavLink>
        )}
        {isLoggedIn ? (
          <button
            onClick={() => logout()}
            className="btn font-bold text-3xl ms-2"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="btn font-bold text-3xl ms-2">Login</button>
          </NavLink>
        )}
       
      </div>
    </div>
  );
};

export default Navbar;
