
// server.js
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

let messages = [];
let endedChats = [];

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            prompt: userMessage,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.9,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            },
        });

        const botReply = response.data.choices[0].text;
        messages.push({ sender: 'bot', text: botReply });
        res.json({ reply: botReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/api/end-chat', (req, res) => {
    endedChats = endedChats.concat(messages);
    messages = [];
    res.status(200).send();
});

app.get('/api/sessions', (req, res) => {
    res.json(messages);
});

app.get('/api/ended-chats', (req, res) => {
    res.json(endedChats);
});


app.get('/api/activity-data', (req, res) => {
    const dates = endedChats.map(chat => chat.date);
    const chatCounts = dates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    res.json({
        dates: Object.keys(chatCounts),
        chatCounts: Object.values(chatCounts),
    });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
