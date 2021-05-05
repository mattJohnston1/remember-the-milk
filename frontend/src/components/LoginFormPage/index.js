// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemo = () => {
    return dispatch(sessionActions.login({credential: "Demo-lition", password: "password"}))
  }
  
  return (
    <div className="login-page">
      <div className="login-logo"><img className="logo" src="http://jtalkonline.com/wp-content/uploads/2018/02/logo_rememberthemilk.png" />
</div>
      <div className="login-left">
        <div className="login-text">
          <div className="quote">"Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."</div>
          <div className="quote-author">- Paul J. Meyer</div>
        </div>
      </div>
      <div className="login-right">
        <div
          className="signup-redirect"
          onClick={()=>history.push('/signup')}>
          Sign Up
        </div>
        <div onClick={handleDemo} className="signup-redirect demo">
          Demo
        </div>


        <div className="login-form-header">Been here before? Welcome Back!</div>
        <form className="login-form user-form" onSubmit={handleSubmit}>
            <ul className="login-erros">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <input
              placeholder="Email or username"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

          <button className="login-submit" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
