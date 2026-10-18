import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ECG from './pages/ECGGrafic';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/ekg" element={<ECG />} />
            </Routes>
        </Router>
    );
}

export default App;
