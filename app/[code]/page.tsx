"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Chat from "./Chat";

const GamePage = () => {
  const code = usePathname().substring(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Game Room: {code}</h1>
      <Chat />
    </main>
  );
};

export default GamePage;
