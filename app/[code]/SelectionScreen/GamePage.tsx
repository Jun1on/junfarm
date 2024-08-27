"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Chat from "./Chat";
import InviteFriends from "./InviteFriends";
import Players from "./Players";
import GameSettings from "./GameSettings";
import io from "socket.io-client";
import sampleUsernames from "@/data/sampleUsernames";
import { Toaster, toast } from "react-hot-toast";
const socket = io("http://localhost:8080");
import { Player } from "../interfaces/Player";

const GamePage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const code = usePathname().substring(1);
  const username = useMemo(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      console.log("Retrieved stored username:", storedUsername);
      return storedUsername;
    }
    const newUsername =
      sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)];
    console.log("Generated new username:", newUsername);
    localStorage.setItem("username", newUsername);
    return newUsername;
  }, []);

  useEffect(() => {
    socket.emit("setClient", { code, username });
  }, [code, username]);

  useEffect(() => {
    socket.on("updatePlayers", (players: Player[]) => {
      setPlayers(players);
    });

    socket.on("toast", (message: string) => {
      toast(message);
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("toast");
    };
  }, [socket]);

  return (
    <main className="flex h-screen flex-row items-stretch justify-between p-6 bg-blue-900">
      <Toaster />
      <div className="flex h-full flex-col w-1/3">
        <InviteFriends code={code} />
        <Players username={username} socket={socket} players={players} />
      </div>

      <GameSettings code={code} admin={false} />

      <div className="w-1/3 h-full">
        <Chat code={code} socket={socket} />
      </div>
    </main>
  );
};

export default GamePage;
