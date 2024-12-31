import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <h1>Welcome to Chat Paddi</h1>
            <p>Your reliable chat platform.</p>
            <Link to="/login" className="btn">
                Start Chatting
            </Link>
        </div>
    );
};

export default LandingPage;
