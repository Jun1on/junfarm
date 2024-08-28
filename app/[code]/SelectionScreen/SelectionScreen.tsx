"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import InviteFriends from "./InviteFriends";
import Players from "./Players";
import GameSettings from "./GameSettings";
import { toast } from "react-hot-toast";
import { Player } from "../interfaces/Player";
import { Socket } from "socket.io-client";
import config from "@/config.json";

const SelectionScreen = ({
  socket,
  username,
  code,
}: {
  socket: Socket;
  username: String;
  code: String;
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(config.api + "/room/" + code);
        const data: Player[] = await response.json();
        setPlayers(data);
      } catch (error) {
        toast.error("Failed to load players.");
      }
    };

    fetchPlayers();

    socket.on("updatePlayers", (players: Player[]) => {
      setPlayers(players);
    });

    return () => {
      socket.off("updatePlayers");
    };
  }, [socket]);

  return (
    <main className="flex h-screen flex-row items-stretch justify-between p-6 bg-blue-900">
      <div className="flex h-full flex-col w-1/3">
        <InviteFriends code={code} />
        <Players username={username} socket={socket} players={players} />
      </div>

      <GameSettings admin={false} />

      <div className="w-1/3 h-full">
        <Chat socket={socket} />
      </div>
    </main>
  );
};

export default SelectionScreen;
