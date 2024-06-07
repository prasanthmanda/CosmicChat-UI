// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import EndedChats from './pages/EndedChats';
import ActivityDashboard from './pages/ActivityDashboard';
import LandingPage from './pages/LandingPage';
import { Container } from '@mui/material';

function App() {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/ended-chats" element={<EndedChats />} />
                    <Route path="/activity-dashboard" element={<ActivityDashboard />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
