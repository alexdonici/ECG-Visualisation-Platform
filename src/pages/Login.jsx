// src/pages/Login.jsx
import React from 'react';
import LoginCard from '../components/LoginCard';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="left-panel">
        <p>
         Bine ați venit! Vă rugăm să vă autentificați pentru a vizualiza conținutul.
        </p>
      </div>
      <div className="right-panel">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
