import React, { useState } from "react";
import "./styles/SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [passwordLength, setPasswordLength] = useState(false);

  const handlePassword = (e) => {
    const val = e.target.value;
    if (val.length < 8) {
      setPasswordLength(true);
    } else setPasswordLength(false);
  };
  
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
            <input placeholder="Full name" type="text" required />
            <br />
          </div>

          <div>
            <label>Email address</label>
            <br />
            <input placeholder="Email " type="email" required />
            <br />
          </div>

          <div>
            <label>Password</label>
            <br />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => handlePassword(e)}
              required
            />
            {passwordLength ? (
              <i className="error">Minimum 8 characters allowed</i>
            ) : (
              ""
            )}
          </div>

          <div className="profile">
            <div className="user-logo">
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <input type="file" />
            </div>
            <div>
              <i className="avatar">Upload your avatar</i>
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
