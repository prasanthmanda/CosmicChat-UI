// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStartChat = () => {
        navigate('/chat');
    };

    const handleViewActivity = () => {
        navigate('/activity-dashboard');
    };

    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>Welcome to ReX Chat</Typography>
            <Button variant="contained" onClick={handleStartChat} sx={{ m: 1 }}>Start Chat</Button>
            <Button variant="contained" onClick={handleViewActivity} sx={{ m: 1 }}>View Activity</Button>
        </Box>
    );
};

export default LandingPage;
