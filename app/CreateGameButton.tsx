"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const generateRoomCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  let roomCode = "";
  for (let i = 0; i < 4; i++) {
    roomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return roomCode;
};

const CreateGameButton = () => {
  const router = useRouter();

  const handleCreateGame = () => {
    const roomCode = generateRoomCode();
    router.push(`/${roomCode}`);
  };

  return (
    <Button onClick={handleCreateGame} className="mr-4">
      Create Game
    </Button>
  );
};

export default CreateGameButton;
