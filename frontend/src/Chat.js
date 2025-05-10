import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles.css';

function Chat() {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: "Hi there! I'd love to get to know you — **what's your name, what do you do, and what are you looking to create or grow?**"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setMessages(prev => [...prev, { sender: 'bot', text: data.message }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Sorry, something went wrong. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => setInput(e.target.value);
    const handleKeyPress = (e) => e.key === 'Enter' && sendMessage();

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-bubble">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot">
                        <div className="message-bubble loading">Thinking...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button onClick={sendMessage} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
