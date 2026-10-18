import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCard.css'; // reuse existing styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) throw new Error('Autentificare eșuată');
  
        const data = await response.json();
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        navigate('/ekg');
      } catch (err) {
        setError(true);
      }
    };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>Login failed. Try again.</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;

