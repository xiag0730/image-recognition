import React from 'react';

const ChatWindow = ({ messages, isLoading, onSendMessage }) => {
  // messages: 消息列表数组
  // isLoading: 加载状态布尔值
  // onSendMessage: 发送消息的回调函数
  const [inputValue, setInputValue] = React.useState('');
  // 管理输入框的值

  const handleSubmit = (e) => {
    e.preventDefault();  // 阻止表单默认提交行为
    if (inputValue.trim()) {  // 检查输入值是否为空（去除空格后）
      onSendMessage(inputValue.trim());  // 调用传入的回调函数发送消息
      setInputValue('');  // 清空输入框
    }
  };
  // 处理消息发送

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.role === 'user' ? 'user' : 'assistant'} ${message.error ? 'error' : ''}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">正在思考中...</div>
          </div>
        )}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息..."
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
};

export default ChatWindow; 