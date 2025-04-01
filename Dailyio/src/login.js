import React from "react";
import { Link } from "react-router-dom";
import "./login.css"; // Ensuring styles are imported

const Login = () => {
  return (
    <div className="auth-module">
      <div className="auth-page-wrapper">
        <div className="auth-login-container">
          
          <div className="auth-logo">
            <Link to="/">
              <img src="Logo.png" alt="DailyIO" width="50" />
            </Link>
          </div>

          <div className="auth-signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>

          <form>
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <input type="email" id="email" name="email" className="auth-input" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">Password</label>
              <input type="password" id="password" name="password" className="auth-input" required />
            </div>

            <div className="auth-remember-forgot">
              <div className="auth-remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="auth-forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-login-button">Log In</button>
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

export default Login;
