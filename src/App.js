import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setloading] = useState(false);

  const animation=<div class='typing'>
  <span></span>
  <span></span>
  <span></span>
 </div>
  // const data=(data)=>{
  //   setChat(data);
  // }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
  };

  const handleSendMessage = async() => {
    const URL='http://srinjoy.co:16103/gen/';
    if (inputValue.trim() !== '') {
      const newChat = { question_text: inputValue, user: 'user'};
      setMessages([...messages,newChat]);
      setloading(true);
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newChat),
        });

        if (!response.ok) {
          throw new Error('Failed to post user message');
        }

        // Assuming the server responds with JSON data
        const responseData = await response.json();
        console.log(responseData);
        // Update state with the received response
        const newChatMessage = { question_text: responseData.label, user: 'chat' };
        setMessages((prev)=>[...prev,newChatMessage]);
        setInputValue('');
      } catch (error) {
        console.error('Error posting user message:', error);
      } finally{
        setloading(false);
      }
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.user}`}>
              {message.question_text}
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
          {loading?animation:<button onClick={handleSendMessage}>Send</button>}
          
        </div>
      </div>
    </div>
  );
};

export default App;
