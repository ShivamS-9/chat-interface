const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.COHERE_API_KEY;
if (!apiKey) {
    console.error("COHERE_API_KEY not found in .env file!");
    process.exit(1);
}

const conversationHistory = [
    {
        role: "SYSTEM",
        message: "You are a helpful assistant. Format all responses using markdown: use **bold**, _italic_, bullet points, numbered lists, and code blocks where appropriate."
    }
];

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: 'Message is required' });

    try {
        conversationHistory.push({ role: "USER", message: userMessage });

        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                model: "command-r-plus",
                message: userMessage,
                chat_history: conversationHistory,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data.text;
        conversationHistory.push({ role: "CHATBOT", message: reply });

        res.json({ message: reply });

    } catch (error) {
        console.error('Cohere API error:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Error processing your request' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
