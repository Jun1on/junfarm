"use client";

import { Socket } from "socket.io-client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Buttons from "./Buttons";
import { Player } from "../interfaces/Player";

const GameSettings = ({
  socket,
  isAdmin,
  players,
  isReady,
}: {
  socket: Socket;
  isAdmin: boolean;
  players: Player[];
  isReady: boolean;
}) => {
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const [junion, setJunion] = useState(true);
  const allPlayersReady = players.every((player) => player.ready);

  return (
    <div
      className={"w-full h-full mx-4 bg-blue-700 rounded-md p-4 flex flex-col"}
    >
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Game Settings</h2>
        <div className="flex flex-col space-y-4">
          {/* Options */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Checkbox
                checked={isPrivateGame}
                onCheckedChange={() => setIsPrivateGame(!isPrivateGame)}
                disabled={!isAdmin}
              />
              <label className="ml-2">Private Game</label>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={junion}
                onCheckedChange={() => setJunion(!junion)}
                disabled={!isAdmin}
              />
              <label className="ml-2">Subscribe to Junion</label>
            </div>
          </div>

          {/* Game Mode and Map */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p>Game Mode</p>
              {/* Placeholder for Game Mode */}
              <div className="w-20 h-20 bg-blue-600 rounded-md mt-2"></div>
            </div>
            <div className="text-center">
              <p>Map</p>
              {/* Placeholder for Map */}
              <div className="w-20 h-20 bg-blue-600 rounded-md mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <Buttons
        socket={socket}
        isReady={isReady}
        allPlayersReady={allPlayersReady}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default GameSettings;
