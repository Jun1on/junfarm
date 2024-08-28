"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Socket } from "socket.io-client";

const Chat = ({ socket }: { socket: Socket }) => {
  const [messages, setMessages] = useState<String[]>([]);
  const [input, setInput] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("message", (message) => {
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        setIsScrolledToBottom(
          chatContainer.scrollHeight - chatContainer.scrollTop <
            chatContainer.clientHeight + 5
        );
      }
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (isScrolledToBottom) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-secondary rounded-md">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 p-2 bg-accent rounded break-all">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex m-2">
        <Input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Send a message"
          maxLength={100}
        />
      </div>
    </div>
  );
};

export default Chat;
