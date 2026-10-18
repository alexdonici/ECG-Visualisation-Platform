// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EKGChart from './pages/EKGChart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ekg" element={<EKGChart />} />
      </Routes>
    </Router>
  );
}

export default App;
