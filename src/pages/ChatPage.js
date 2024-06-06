// src/pages/ChatPage.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:5001/api/chat', { message: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const botMessage = { sender: 'bot', text: 'Error communicating with the server' };
            setMessages([...messages, newMessage, botMessage]);
        }

        setInput('');
    };

    return (
        <div className="chat-page">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
