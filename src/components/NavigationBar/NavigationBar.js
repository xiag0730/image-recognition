import React from "react";

const NavigationBar = ({ chatHistory = [], onHistoryItemClick, onNewChat, onDeleteChat }) => {
  return (
    <div className="navbar-container">
      <h2 className="navbar-title">
        搜索记录
      </h2>
      
      <button 
        className="new-chat-button" 
        onClick={onNewChat}
      >
        ➕ 发起新对话
      </button>
      
      <div className="history-container">
        <ul className="chat-list">
          {chatHistory.map((chat) => (
            <li key={chat.id} className="chat-item">
              <span onClick={() => onHistoryItemClick(chat)}>
                {chat.title || "新对话"}
              </span>
              
              <button
                type="button"
                className="delete-btn btn btn-outline-light"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
