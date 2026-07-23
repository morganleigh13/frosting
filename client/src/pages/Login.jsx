import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authLogin, resetPassword, successState } from "../redux/authSlice";
import styled from "styled-components";
import toast from "react-hot-toast";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    formStatus: false,
  });
  const [securityQuestion, setSecurityQuestion] = useState({
    username: "",
    answer: "",
    password: "",
    confirmPassword: ""
  });

  const passwordModal = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, user, authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success === "negative") {
      toast.error("Please check your credentials.");
      dispatch(successState())
    }
     if (success === "login success") {
      toast.success(`Welcome back ${user.firstName}`);
      dispatch(successState())
      navigate("/");
    }
    if (success === "password updated"){
      toast.success(`Password reset. Please login.`);
    dispatch(successState())
    }
    
  }, [success]);



  const handleForm = (e, field) => {
    setLoginForm((l) => {
      const status =
        field === "username"
          ? e.target.value.length >= 3 && l.password.length >= 3
          : l.email.length >= 3 && e.target.value.length >= 3;
      return {
        ...loginForm,
        email: field === "username" ? e.target.value : l.email,
        password: field === "password" ? e.target.value : l.password,
        formStatus: status,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authLogin(loginForm));
    successState();
  };

  const checkPassword = (e) => {
    e.preventDefault();
    const resetForm ={
      username: securityQuestion.username,
      answer: securityQuestion.answer,
      password: securityQuestion.password
    }  
    if(securityQuestion.password === securityQuestion.confirmPassword){
      dispatch(resetPassword(resetForm))
      successState()
    }
  };

  return (
    <>
      <StyledWrapper>
        <div className="login-container top-30 xl:left-130 lg:left-90  flex justify-center">
          <div className="login-box">
            <h2 className="justify-self-end text-6xl text-accent pb-1 tracking-wider font-bold fancier">
              Login
            </h2>
            <form className="w-full px-3 ms-10 sweet " onSubmit={handleLogin}>
              <div className="relative my-7">
                <input
                  value={loginForm.email}
                  onChange={(e) => handleForm(e, "username")}
                  className="w-full bg-transparent h-15 rounded-3xl text-xl text-base-content px-3 login-input"
                  required
                  type="username"
                />
                <label className="login-label text-xl font-bold rounded-xl ">
                  Username
                </label>
              </div>
              <div className="relative my-7">
                <input
                  value={loginForm.password}
                  onChange={(e) => handleForm(e, "password")}
                  className="w-full bg-transparent h-15 rounded-3xl text-xl text-base-content px-3 login-input"
                  required
                  type="password"
                />
                <label className="login-label text-xl font-bold rounded-xl">
                  Password
                </label>
              </div>
              <div
                onClick={() => passwordModal.current.showModal()}
                className="forgot-pass"
              >
                <p>Forgot your password?</p>
              </div>
              <button
                disabled={!loginForm.formStatus}
                className="btn login-btn ms-10 disabled:bg-base-300 text-xl tracking-wider text-accent-content font-extrabold bg-accent"
                type="submit"
              >
                Login
              </button> 
              <div className="signup-link">
                <button className="text-info" type="button" onClick={() => navigate("/signup")}>Sign Up</button>
              </div>
            </form>
          </div>
          <span style={{ "--i": 0 }} />
          <span style={{ "--i": 1 }} />
          <span style={{ "--i": 2 }} />
          <span style={{ "--i": 3 }} />
          <span style={{ "--i": 4 }} />
          <span style={{ "--i": 5 }} />
          <span style={{ "--i": 6 }} />
          <span style={{ "--i": 7 }} />
          <span style={{ "--i": 8 }} />
          <span style={{ "--i": 9 }} />
          <span style={{ "--i": 10 }} />
          <span style={{ "--i": 11 }} />
          <span style={{ "--i": 12 }} />
          <span style={{ "--i": 13 }} />
          <span style={{ "--i": 14 }} />
          <span style={{ "--i": 15 }} />
          <span style={{ "--i": 16 }} />
          <span style={{ "--i": 17 }} />
          <span style={{ "--i": 18 }} />
          <span style={{ "--i": 19 }} />
          <span style={{ "--i": 20 }} />
          <span style={{ "--i": 21 }} />
          <span style={{ "--i": 22 }} />
          <span style={{ "--i": 23 }} />
          <span style={{ "--i": 24 }} />
          <span style={{ "--i": 25 }} />
          <span style={{ "--i": 26 }} />
          <span style={{ "--i": 27 }} />
          <span style={{ "--i": 28 }} />
          <span style={{ "--i": 29 }} />
          <span style={{ "--i": 30 }} />
          <span style={{ "--i": 31 }} />
          <span style={{ "--i": 32 }} />
          <span style={{ "--i": 33 }} />
          <span style={{ "--i": 34 }} />
          <span style={{ "--i": 35 }} />
          <span style={{ "--i": 36 }} />
          <span style={{ "--i": 37 }} />
          <span style={{ "--i": 38 }} />
          <span style={{ "--i": 39 }} />
          <span style={{ "--i": 40 }} />
          <span style={{ "--i": 41 }} />
          <span style={{ "--i": 42 }} />
          <span style={{ "--i": 43 }} />
          <span style={{ "--i": 44 }} />
          <span style={{ "--i": 45 }} />
          <span style={{ "--i": 46 }} />
          <span style={{ "--i": 47 }} />
          <span style={{ "--i": 48 }} />
          <span style={{ "--i": 49 }} />
        </div>
      </StyledWrapper>
      <dialog
        ref={passwordModal}
        id="passwordModal"
        className="modal modal-bottom sm:modal-middle pe-10"
      >
        <div className="modal-box">
          <form method="dialog" onSubmit={checkPassword} className="bg-neutral">
            <div className="flex flex-col sweet tracking-widest space-y-2 p-3">
              <h1 className="text-5xl text-accent">Security Question</h1>
              <h3 className="text-2xl text-secondary">Username</h3>
              <input
                className="bg-secondary/60 rounded-xl text-2xl h-fit p-2 font-bold text-secondary-content"
                type="text"
                value={securityQuestion.username}
                onChange={(e) =>
                  setSecurityQuestion({
                    ...securityQuestion,
                    username: e.target.value,
                  })
                }
              />
              <h3 className="text-2xl text-secondary">
                What is your favorite color?
              </h3>
              <input
                className="bg-secondary/60 rounded-xl text-2xl h-fit p-2 font-bold text-secondary-content"
                type="text"
                value={securityQuestion.answer}
                onChange={(e) =>
                  setSecurityQuestion({
                    ...securityQuestion,
                    answer: e.target.value,
                  })
                }
              />
               <h3 className="text-2xl text-primary">
                New Password
              </h3>
              <input
                className="bg-secondary/60 rounded-xl text-2xl h-fit p-2 font-bold text-primary-content"
                type="password"
                value={securityQuestion.password}
                onChange={(e) =>
                  setSecurityQuestion({
                    ...securityQuestion,
                    password: e.target.value,
                  })
                }
              />
               <h3 className="text-2xl text-primary">
                Confirm Password
              </h3>
              <input
                className="bg-secondary/60 rounded-xl text-2xl h-fit p-2 font-bold text-primary-content"
                type="password"
                value={securityQuestion.confirmPassword}
                onChange={(e) =>
                  setSecurityQuestion({
                    ...securityQuestion,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <div className="flex justify-around">
                <button
                onClick={() => passwordModal.current.close()}
                  type="submit"
                  className="btn text-lg me-3 text-accent font-extrabold tracking-wider"
                >
                  Find Password
                </button>
                <button type="button" onClick={() => passwordModal.current.close()} className="btn text-lg me-3 text-warning font-extrabold tracking-wider">
                  Nevermind
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

const StyledWrapper = styled.div`
  .login-container {
    position: relative;
    width: 700px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
  }

  .login-container span {
    position: absolute;
    left: 150px;
    bottom: 48%;
    width: 32px;
    height: 26px;
    background: var(--color-base-300);
    border-radius: 80px;
    transform-origin: 240px; // changes ring size
    transform: rotate(calc(var(--i) * (360deg / 50)));
    animation: blink 3s linear infinite;
    animation-delay: calc(var(--i) * (3s / 50));
  }

  @keyframes blink {
    0% {
      background: var(--color-accent);
    }
    25% {
      background: var(--color-base-300);
    }
  }

  .login-box {
    position: absolute;
    top: 15%;
    right: px;
    width: 80%;
    max-width: 300px;
    z-index: 1;
    padding: 20px;
    border-radius: 20px;
  }

  .login-input {
    border: 2px solid var(--color-base-300);
    outline: none;
    transition: 0.5s ease;
  }

  .login-input:focus {
    border-color: var(--color-accent);
  }

  .login-input[value]:not([value=""]) ~ label,
  .login-input:focus ~ label {
    top: -10px;
    background: #1f293a;
    padding: 0 6px;
    color: var(--color-accent);
  }

  .login-label {
    position: absolute;

    left: 15px;
    transform: translateY(-50%);
    pointer-events: none;
    transition: 0.5s ease;
  }

  .forgot-pass {
    margin: -10px 0 10px;
    text-align: center;
  }

  .forgot-pass a {
    font-size: 0.85em;
    color: var(--color-info);
    text-decoration: none;
  }

  .login-btn {
    width: 70%;
    height: 35px;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
  }

  .signup-link {
    margin: 10px 0;
    text-align: center;
  }

  .signup-link a {
    font-size: 1em;
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
  }
`;

export default Login;
