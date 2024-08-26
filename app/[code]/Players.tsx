"use client";

import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface Player {
  id: string;
  username: string;
}

const Players = ({
  username,
  socket,
}: {
  username: String;
  socket: Socket;
}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Listen for updates to the player list
    socket.on("updatePlayers", (players: Player[]) => {
      setPlayers(players);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("updatePlayers");
    };
  }, [socket]);

  return (
    <div className="w-full h-full bg-blue-700 rounded-md p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <div className="flex flex-col space-y-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 bg-blue-600 rounded"
          >
            <div>
              <span className="font-semibold">
                {player.username}
                {player.username === username ? " (You)" : ""}
              </span>
              <p className="text-xs">Karma: 0/0</p>
            </div>
            <div className="text-green-400 font-bold">READY</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
