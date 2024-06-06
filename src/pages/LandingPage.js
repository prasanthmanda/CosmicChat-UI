// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStartChat = () => {
        navigate('/chat');
    };

    return (
        <div className="landing-page">
            <h1>Welcome to ReX Chat</h1>
            <button onClick={handleStartChat}>Start Chat</button>
        </div>
    );
};

export default LandingPage;
