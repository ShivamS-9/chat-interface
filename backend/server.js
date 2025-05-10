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

        const markdownResponse = `
## Response

**Here’s your answer:**

- Point 1: _Explanation_
- Point 2: **Details**

\`\`\`js
const message = "Hello World!";
console.log(message);
\`\`\`
        `;

        conversationHistory.push({ role: "CHATBOT", message: markdownResponse });
        res.json({ message: markdownResponse });

    } catch (error) {
        console.error('Cohere API error:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Error processing your request' });
    }
});
