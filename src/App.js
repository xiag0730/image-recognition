import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { chatWithAI } from './services/api';

function App() {
  // 从 localStorage 初始化状态
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentChat, setCurrentChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 保存聊天历史到 localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSendMessage = async (message) => {
    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setCurrentChat(prev => [...prev, userMessage]);

    
    setIsLoading(true);
    try {
      const response = await chatWithAI(message);
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      setCurrentChat(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `调用失败: ${error.message}`,
        timestamp: new Date().toISOString(),
        error: true
      };
      setCurrentChat(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    if (currentChat.length > 0) {
      setChatHistory(prev => [...prev, {
        id: Date.now(),
        title: currentChat[0].content.substring(0, 30),
        messages: currentChat
      }]);
    }
    setCurrentChat([]);
  };

  const loadChat = (chat) => {
    setCurrentChat(chat.messages);
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <div className="app">
      <NavigationBar 
        chatHistory={chatHistory}
        onHistoryItemClick={loadChat}
        onNewChat={startNewChat}
        onDeleteChat={deleteChat}
      />
      <ChatWindow 
        messages={currentChat}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
