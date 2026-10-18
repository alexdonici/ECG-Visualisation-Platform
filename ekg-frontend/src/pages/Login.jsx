// src/pages/Login.jsx
import React, { useState } from 'react';
import LoginCard from '../components/LoginCard';
import './Login.css';

const Login = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`login-page ${darkMode ? 'dark' : ''}`}>
            <div className="left-panel">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et molestie mi, vel aliquam metus...
                </p>
            </div>
            <div className="right-panel">
                <div className="toggle-btn">
                    <button onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? 'Light🔆' : 'Dark🌙'}
                    </button>
                </div>
                <LoginCard />
            </div>
        </div>
    );
};

export default Login;


