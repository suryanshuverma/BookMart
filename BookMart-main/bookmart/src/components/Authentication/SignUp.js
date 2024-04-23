import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./SignUp.css";
import constants from "../Utilities/Constants";
import { TextField } from "@mui/material";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialCartValue = 0;
        addDoc(collection(db, "users"), {
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          cart: initialCartValue,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(constants.successMsg);
            setUserName("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg(constants.missingFields);
        }
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg(constants.errorMsg);
        }
      });
  };

  return (
    <div className="signup-bg">
      <div className="background-image"></div>

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p>{constants.createAccount}</p>

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
          <label>{constants.name}</label>
          <input
            required
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>{constants.email}</label>

          <input
          required
            type="email"
            placeholder="Enter Your Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>{constants.password}</label>
          <input
          required
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>{constants.phoneNumber}</label>
          <input
          required
            type="password"
            placeholder="Enter Your Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">{constants.signUp}</button>
          <div>
            <span>{constants.accountCheck}</span>
            <Link to="/login">{constants.signIn}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;