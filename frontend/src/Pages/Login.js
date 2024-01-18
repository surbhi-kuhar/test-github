import React from "react";
import "./styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Login to your account</h2>
        </div>
        <div className="content">
          <div>
            <label>Email address</label>
            <br />
            <input placeholder="Email" type="email" required />
            <br />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input type="password" placeholder="Password" required />
          </div>

          <div className="options">
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <span>Remember me</span>
            </div>

            <div>
              <a>Forgot your password?</a>
            </div>
          </div>

          <button className="submit-btn">Submit</button>

          <p>
            Not have any account?{" "}
            <Link to="/sign-up">
              <span className="sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
