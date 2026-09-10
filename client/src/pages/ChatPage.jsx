import React from 'react';
import ChatWindow from '../components/ChatWindow';

export default function ChatPage({
  messages,
  inputMessage,
  setInputMessage,
  selectedFile,
  setSelectedFile,
  onSendMessage,
  loading
}) {
  return (
    <div className="flex-1 flex flex-col">
      <ChatWindow
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onSendMessage={onSendMessage}
        loading={loading}
      />
    </div>
  );
}