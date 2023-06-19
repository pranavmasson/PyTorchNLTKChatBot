import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const data = await response.json();
      console.log(data); // Check the response data received
  
      setBotResponse(data.bot_response);
    } catch (error) {
      console.error(error);
    }
  
    setUserInput('');
  };

  return (
    <div>
      <h1>ChatBot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      {botResponse && <p>{botResponse}</p>}
    </div>
  );
};

export default ChatComponent;