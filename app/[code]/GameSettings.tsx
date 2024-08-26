"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const GameSettings = ({ code, admin }: { code: String; admin: boolean }) => {
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const [junion, setJunion] = useState(true);

  return (
    <div className={"w-full h-full bg-blue-700 rounded-md p-4 mx-4"}>
      <h2 className="text-xl font-bold mb-4">Game Settings</h2>
      <div className="flex flex-col space-y-4">
        {/* Options */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Checkbox
              checked={isPrivateGame}
              onCheckedChange={() => setIsPrivateGame(!isPrivateGame)}
              disabled={!admin}
            />
            <label className="ml-2">Private Game</label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={junion}
              onCheckedChange={() => setJunion(!junion)}
              disabled={!admin}
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

        {/* Ready and Start Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="default" disabled={!admin}>
            I'm Ready
          </Button>
          <Button variant="default" disabled={!admin}>
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
