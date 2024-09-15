import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Logo from "./Logo.png";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history("/");
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
        alert(error.message);
      });
  };

  const Register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history("/");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to={"/"}>
        <img className="login_logo" src={Logo} alt="FreshFromFarmersLogo" />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>
        <form>
          <h5>Email-Id</h5>
          <input
            type="text"
            placeholder="Enter Your Email-Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={SignIn} className="login_signInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing in, you agree to FreshFromFarmers's Conditions of Use and
          Privacy Notice. You may also receive communication from
          FreshFromFarmers, including marketing messages, and you can opt-out
          anytime.
        </p>
        <button onClick={Register} className="login_registerButton">
          Create an FreshFromFarmers Account
        </button>
      </div>
    </div>
  );
}

export default Login;
