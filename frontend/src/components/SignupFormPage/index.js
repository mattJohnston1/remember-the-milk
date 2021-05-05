// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-page">
      <div className="login-logo"><img className="logo" src="http://jtalkonline.com/wp-content/uploads/2018/02/logo_rememberthemilk.png" />
      </div>
      <div className="login-left">
      <div className="signup-intro">
        {/* <div className="signup-chars">
          <div className="char1 char"></div>
          <div className="char2 char"></div>
          <div className="char3 char"></div>
        </div> */}
        <div className="signup-text">Join millions of people getting more organized and productive!</div>
      </div>
      </div>
      <div className="login-right">
        <div 
        className="signup-redirect"
        onClick={()=>history.push("/login")}
        >Login</div>
        <div className="login-form-header">Sign up for free</div>
        <form className="user-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          <button className="login-submit" type="submit">Sign Up!</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
