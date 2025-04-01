import React from "react";
import { Link } from "react-router-dom";
import "./signup.css"; 

const Signup = () => {
  return (
    <div className="auth-module">
      <div className="auth-page-wrapper">
        <div className="auth-signup-container">

          <div className="auth-logo">
            <Link to="/">
              <img src="Logo.png" alt="DailyIO" width="50" />
            </Link>
          </div>

          <form>
            <div className="auth-login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </div>

            <div className="auth-form-group">
              <label htmlFor="fullname" className="auth-label">Full Name</label>
              <input type="text" id="fullname" name="fullname" className="auth-input" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <input type="email" id="email" name="email" className="auth-input" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">Password</label>
              <input type="password" id="password" name="password" className="auth-input" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirm-password" className="auth-label">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" className="auth-input" required />
            </div>

            <button type="submit" className="auth-signup-button">Sign Up</button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button className="auth-google-login">
            <b>G</b> Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Signup;
