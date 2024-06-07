// src/pages/ChatPage.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/sessions').then(response => {
            setMessages(response.data);
        });
    }, []);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);

        const response = await axios.post('/api/chat', { message: input });
        const botMessage = { sender: 'bot', text: response.data.reply };
        setMessages([...messages, newMessage, botMessage]);

        setInput('');
    };

    const endChat = () => {
        axios.post('/api/end-chat').then(() => {
            navigate('/ended-chats');
        });
    };

    return (
        <Box sx={{ padding: 2 }}>
            <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg.text} secondary={msg.sender} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <Button variant="contained" onClick={sendMessage} sx={{ ml: 2 }}>Send</Button>
            </Box>
            <Button variant="contained" color="secondary" onClick={endChat} sx={{ mt: 2 }}>
                End Chat
            </Button>
        </Box>
    );
};

export default ChatPage;
