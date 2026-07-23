import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { authSignup, successState } from "../redux/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
const [signupForm, setSignupForm] = useState({ firstName: '', lastName: '', email: '', username: '', password:'', confirmPassword: '', answer: ''})
const dispatch = useDispatch()
const navigate = useNavigate()
const {success, user} = useSelector(state => state.auth)

useEffect(() => {
    console.log(success);
    if (success === "negative") {
      toast.error("Please check your form for typos.");
    } else if (success === "user created") {
      toast.success(`Please login ${user.firstName}`);
      successState();
      navigate("/login");
    }
}, [success])

  const handleSignup = (e) => {
    e.preventDefault();
    if(signupForm.password === signupForm.confirmPassword) {
        const newSignupForm = { firstName: signupForm.firstName , lastName: signupForm.lastName , email: signupForm.email , username: signupForm.username , password:signupForm.password ,  answer: signupForm.answer }
        dispatch(authSignup(newSignupForm))
    }

  };
  return (
    <div className="w-screen h-screen flex justify-center pt-20 turret">
      <form
        onSubmit={handleSignup}
        className="signup-form flex flex-col h-fit w-5xl max-w-700 relative bg-base-100 space-y-4"
      >
        <p className="signup-title text-primary tech tracking-widest">Register</p>
        <p className="message text-info text-lg ps-2">
          Signup now and get full access to our app.{" "}
        </p>
        <div className="flex gap-4">
          <label className="text-accent">
            <input
            required
            value={signupForm.firstName}
            onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="text"
            />
            <span className="absolute top-1 left-3 text-lg">First name</span>
          </label>

          <label className="text-accent">
            <input
            required
            value={signupForm.lastName}
            onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="text"
            />
            <span className="absolute top-1 left-3 text-lg">Last name</span>
          </label>

          <label className="text-accent">
            <input
            required
            value={signupForm.email}
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="email"
            />
            <span className="absolute top-1 left-3 text-lg">Email</span>
          </label>
        </div>
        <div className="flex gap-4">
          <label className="text-accent">
            <input
            required
            value={signupForm.username}
            onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="text"
            />
            <span className="absolute top-1 left-3 text-lg">Username</span>
          </label>
          <label className="text-accent">
            <input
            required
            value={signupForm.password}
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="password"
            />
            <span className="absolute top-1 left-3 text-lg">Password</span>
          </label>
          <label className="text-accent">
            <input
            required
            value={signupForm.confirmPassword}
            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value})}
              className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit"
              type="password"
            />
            <span className="absolute top-1 left-3 text-lg">Confirm Password</span>
          </label>
        </div>
        <div className="inline-flex justify-center gap-20 items-end">
          <div className="">
            <p className="text-xl text-primary pb-1">Security Question</p>
            <label className="flex text-accent">
              <input
              required
              value={signupForm.answer}
              onChange={(e) => setSignupForm({ ...signupForm, answer: e.target.value})}
                className="input bg-base-200 text-base-content text-xl not-valid:text-error font-semibold h-fit w-75"
                type="text"
              />
              <span className="absolute top-1 left-3 text-lg">
                What is your favorite color?
              </span>
            </label>
          </div>
          <div className="">
            <button
              type="submit"
              className="p-7 rounded-xl bg-primary text-primary-content font-extrabold text-xl btn  ms-10"
            >
              Submit
            </button>
          </div>
        </div>
        <p className="signin text-info text-center">
          Already have an account ?{" "}
          <Link to="/login" className="">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
