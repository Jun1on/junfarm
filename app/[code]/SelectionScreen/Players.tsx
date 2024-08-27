"use client";

import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Player } from "../interfaces/Player";
import { Button } from "@/components/ui/button";

const Players = ({
  username,
  socket,
  players,
}: {
  username: String;
  socket: Socket;
  players: Player[];
}) => {
  console.log(username, "username");
  const isAdmin = players[0] && players[0].username === username;
  const [isReady, setIsReady] = useState(isAdmin);

  useEffect(() => {
    if (isAdmin) {
      socket.emit("setReady", true);
    }
  }, [isAdmin, socket]);

  const handleEdit = () => {
    alert("TODO");
  };
  const handleKick = (playerUsername: string) => {
    socket.emit("kickPlayer", playerUsername);
  };

  const handleReady = () => {
    socket.emit("setReady", !isReady);
    setIsReady(!isReady);
  };

  const allPlayersReady = players.every((player) => player.ready);

  return (
    <div className="w-full h-full bg-blue-700 rounded-md p-4 overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <div className="flex flex-col space-y-4">
        {players.map((player, index) => (
          <div
            key={player.username}
            className="relative flex flex-col justify-between p-2 bg-blue-600 rounded"
          >
            {player.username === username ? (
              <PencilIcon
                className="absolute top-2 right-2 h-4 w-4 text-white cursor-pointer"
                onClick={handleEdit}
              />
            ) : (
              isAdmin && (
                <XMarkIcon
                  className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
                  onClick={() => handleKick(player.username)}
                />
              )
            )}

            <div>
              <span className="font-semibold truncate block max-w-[calc(100%-1.5rem)]">
                {index === 0 ? "👑 " : ""}
                {player.username}
                {player.username === username ? " (You)" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-xs">Karma: 0/0</p>
              {player.ready ? (
                <div className="text-xs text-green-400 font-bold">READY</div>
              ) : (
                <div className="text-xs text-red-400 font-bold">not ready</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
