import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [Chat, setChat] = useState('');
  const [inputValue, setInputValue] = useState('');

  
  // const data=(data)=>{
  //   setChat(data);
  // }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newChat = { text: inputValue, user: 'user' };
      const newChatMessage = { text: inputValue, user: 'chat' };
      
      setMessages([...messages, newChat, newChatMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.user}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type Your question ..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
