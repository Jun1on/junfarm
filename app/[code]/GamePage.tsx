"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Chat from "./Chat";
import InviteFriends from "./InviteFriends";
import Players from "./Players";
import GameSettings from "./GameSettings";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const GamePage = () => {
  const code = usePathname().substring(1);
  const username =
    "Guest#" + String(Math.floor(Math.random() * 1000)).padStart(4, "0");

  useEffect(() => {
    socket.emit("setClient", { code, username });
  }, [code, username]);

  return (
    <main className="flex h-screen flex-row items-stretch justify-between p-6 bg-blue-900">
      <div className="flex h-full flex-col w-1/4">
        <InviteFriends code={code} />
        <Players username={username} socket={socket} />
      </div>

      <GameSettings code={code} admin={false} />

      <div className="w-1/4 h-full">
        <Chat code={code} socket={socket} />
      </div>
    </main>
  );
};

export default GamePage;
