import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import svgImg from "../../assests/login-img.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let string = JSON.stringify(userCredential);
        let jsonUser = JSON.parse(string);
        setSuccessMsg(
          "Logged in Successfully, you will be redirected to home page"
        );
        dispatch(authActions.login());
        setEmail("");
        setPassword("");
        setErrorMsg("");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please Fill all required fields");
        }
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message == "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("Wrong Password");
        }
      });
  };
  return (
    <div className="login-bg">
      <div className="background-image"></div>
      <div className="login">
        <div className="login-ui-container">
          <div className="login-ui">
            <div className="login-ui-text">
              <p>NICE TO SEE YOU AGAIN</p>
              <h2>WELCOME BACK</h2>
              <hr />
              <p>
                Please login to Buy the book, or to Sell your book faster with
                us.
              </p>
            </div>
          </div>
        </div>
        <div className="login-container">
          <form className="login-form">
            <p>Login Account</p>

            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}
            {errorMsg && (
              <>
                <div className="error-msg">{errorMsg}</div>
              </>
            )}

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleLogin}>
              Log in
            </Button>
            <div>
              <span>Don't Have an account?</span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

            