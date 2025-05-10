# Modern Immersive Chat Interface

A clean, animated, and responsive chat interface created for the Genoshi Frontend Developer Intern Challenge. This project features a dark-themed UI with smooth animations, React frontend, and Express backend with Cohere AI integration.

## Drive link of demo:
https://shorturl.at/MM4rd

## Features

- Elegant dark mode design with subtle gradient animations
- Animated message bubbles with distinct user/bot styling
- Real-time response handling with loading indicators
- Responsive layout that works across devices
- Express backend with Cohere API integration
- Full keyboard navigation support

## Tech Stack

- **Frontend**: React
- **Backend**: Express
- **API**: Cohere AI for intelligent responses
- **Styling**: Custom CSS with animations

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Cohere API key (get one at [cohere.ai](https://cohere.ai))

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamS-9/chat-interface.git
   cd immersive-chat-interface
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   npm install react-markdown
   
   # Return to root and install backend dependencies
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with your Cohere API key:
   ```bash
   # From the backend directory
   touch .env
   COHERE_API_KEY=your_api_key_here
   ```

## Running the Application

### Development Mode

Run both the frontend and backend servers in development mode:

1. Start the backend server:
   ```bash
   # From the backend directory
   node server.js
   ```
   The server will start on http://localhost:3001

2. In a new terminal, start the frontend development server:
   ```bash
   # From the frontend directory
   npm start
   ```
   The React app will open in your browser at http://localhost:3000

## Project Structure



## Customization

### Changing Colors

The color scheme can be customized in `client/src/styles.css`:

```css
/* Body Background */
body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  /* Change the gradient colors above */
}

/* User Message Bubbles */
.message.user .message-bubble {
  background-color: #001f3f;
  /* Change the user message background color above */
}

/* Bot Message Bubbles */
.message.bot .message-bubble {
  background-color: #374151;
  /* Change the bot message background color above */
}
```

### Modifying Animations

Animations can be adjusted in the same CSS file:

```css
/* Message Appearance Animation */
@keyframes fadeIn {
  /* Modify timing or transform values for different effects */
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## API Integration

The application uses Cohere's API for intelligent responses. The API integration is handled in `server.js`:

```javascript
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    // Add your custom logic here to process messages
    // You can integrate with different NLP/AI services by changing
    // the API endpoint and request format
    
    // Current implementation uses Cohere
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
});
```

## Troubleshooting

### API Connection Issues

If the chat bot doesn't respond:

1. Check that your Cohere API key is correctly set in the `.env` file
2. Ensure the backend server is running
3. Check the browser console and server logs for errors

### CORS Errors

If you see CORS errors in the console:

1. Verify that the Express server has CORS enabled
2. Check that the frontend is making requests to the correct backend URL

## Acknowledgements

- Design inspired by modern chat applications and the provided video reference
- Created for the Genoshi Frontend Developer Intern Challenge
- Uses Cohere's API for intelligent chat responses

