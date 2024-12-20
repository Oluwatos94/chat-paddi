import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from '../resources/js/pages/Auth/RegistrationForm';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
