import React, { useState } from "react";
import "./styles/Login.css";
import { Link } from "react-router-dom";
import hidepng from "../images/hide.png";
import showpng from "../images/show.png";
function Login() {
  const[showPassword,setShowPassword]=useState(false);
  const handlePaswordVisible=()=>{
    setShowPassword(!showPassword);
  }
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
            <input type={showPassword===true?"text":"password"} placeholder="Password" required />
            {showPassword?<span onClick={handlePaswordVisible}><img src={showpng} alt="showpng"/></span>:<span onClick={handlePaswordVisible}
            ><img src={hidepng} alt="hidepng"/></span>}
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
