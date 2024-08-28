import React from "react";
import CreateGameButton from "./CreateGameButton";
import JoinGameButton from "./JoinGameButton";
import localFont from "next/font/local";
const emojiFont = localFont({ src: "./NotoColorEmoji.ttf" });

const LandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className={`text-8xl mb-10 ${emojiFont.className}`}>
        🔵👨‍🌾
        <span />
      </h1>
      <h1 className="text-8xl font-bold mb-2">JunFarm</h1>
      <p className="text-lg mb-10 text-gray-400">
        swap, lend, and farm with friends on your small fishing villiage
      </p>
      <div className="flex">
        <CreateGameButton />
        <JoinGameButton />
      </div>
      <div className="mb-20" />
    </main>
  );
};

export default LandingPage;
