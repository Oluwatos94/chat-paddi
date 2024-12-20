import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/Auth/RegistrationForm';
import Login from './pages/Auth/login';

// App Component
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<Login />} />
                {/* Add other routes here */}
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
