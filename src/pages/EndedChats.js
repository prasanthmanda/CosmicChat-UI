// src/pages/EndedChats.js
import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const EndedChats = () => {
    const [endedChats, setEndedChats] = useState([]);

    useEffect(() => {
        axios.get('/api/ended-chats').then(response => {
            setEndedChats(response.data);
        });
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <List>
                {endedChats.map((chat, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={chat.text} secondary={chat.date} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default EndedChats;
