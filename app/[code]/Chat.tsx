"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col h-screen bg-card rounded-md">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-200 rounded text-black">
            {message}
          </div>
        ))}
      </div>
      <div className="flex m-2">
        <Input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Send a message"
        />
      </div>
    </div>
  );
};

export default Chat;
