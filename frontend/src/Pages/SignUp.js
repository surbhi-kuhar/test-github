import React from "react";
import "./styles/SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Register as a new user</h2>
        </div>
        <div className="content">
          <div>
            <label>Full name</label>
            <br />
            <input type="text" required />
            <br />
          </div>

          <div>
            <label>Email address</label>
            <br />
            <input type="email" required />
            <br />
          </div>

          <div>
            <label>Password</label>
            <br />
            <input type="password" required />
          </div>

          <div className="profile">
            <div className="user-logo">
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <input type="file" />
            </div>
          </div>

          <button className="submit-btn">Submit</button>

          <p>
            Already have an account?
            <Link to="/login">
              <span className="sign-in">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
