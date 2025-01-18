import './bootstrap';
import '../css/app.css';
import '../css/custom-chat.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Chat-room/LandingPage';
import RegistrationForm from './pages/Auth/RegistrationForm';
import ChatPage from './pages/Chat-room/ChatPage';
import Login from './pages/Auth/Login';

// App Component
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<ChatPage friend={friend} currentUser={currentUser} />} />
            </Routes>
        </Router>
    );
};

// Render the application
const root = document.getElementById('root');
if (root) {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(<App />);
}
