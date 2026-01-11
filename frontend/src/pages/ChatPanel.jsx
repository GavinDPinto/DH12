import { useState, useRef, useEffect } from "react";
import Chat from "./Chat.jsx";

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `You said: "${msg}"`, sender: "bot" },
      ]);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);
  useEffect(() => {
  setMessages([]);
}, []);

  return (
    <div className="w-full h-full flex flex-col justify-center -mt-1 mb-20">
        <div className="p-4 border-gray-800">
            <Chat onSend={handleSend} />
        </div>
      <div className="flex-1 overflow-y-auto flex-col w-full h-[75vh] bg-gray-900 rounded-2xl shadow-lg">
        
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4 mt-10">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-xl max-w-[75%] ${
                m.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              }`}
            >
              {m.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
