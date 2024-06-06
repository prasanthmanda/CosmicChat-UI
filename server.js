const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchChatCompletion = async (userMessage, retries = 5, delayTime = 1000) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            prompt: userMessage,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.9,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.warn('Rate limited, retrying...', { retries });
            await delay(delayTime);
            return fetchChatCompletion(userMessage, retries - 1, delayTime * 2);
        } else {
            console.error('Error response from OpenAI:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const botReply = await fetchChatCompletion(userMessage);
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).send('Error communicating with OpenAI');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
