import { useState } from "react";

export default function Chat({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    if (onSend) onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div>
    <div className="w-full text-center mt-40 mb-10 text-6xl font-sans font-bold text-white">How can I help you today?</div>
    <div className="w-full flex items-center p-2 bg-gray-900 rounded-xl shadow-md">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask me anything..."
        className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="ml-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
      >
        Send
      </button>
    </div>
    </div>
  );
}