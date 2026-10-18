// src/pages/Login.jsx
import React from 'react';
import LoginCard from '../components/LoginCard';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="left-panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>
      <div className="right-panel">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
