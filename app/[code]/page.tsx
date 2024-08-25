// "use client";
// import { usePathname } from "next/navigation";
// import React from "react";

// const GamePage = () => {
//   const code = usePathname().substring(1);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <h1 className="text-4xl font-bold mb-8">Game Room: {code}</h1>
//       <p className="text-lg mb-8">
//         Welcome to the game room with code {code}. Enjoy your game!
//       </p>
//       {/* Add more content or components as needed */}
//     </main>
//   );
// };

// export default GamePage;

"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
        }
        .messages {
          flex: 1;
          width: 100%;
          max-width: 600px;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid #ddd;
          background: white;
        }
        .message {
          padding: 5px 10px;
          border-bottom: 1px solid #ddd;
        }
        .input-container {
          display: flex;
          width: 100%;
          max-width: 600px;
          padding: 10px;
          background: white;
          border-top: 1px solid #ddd;
        }
        .input-container input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .input-container button {
          padding: 10px;
          margin-left: 10px;
          border: none;
          background: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Chat;
