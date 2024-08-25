"use client"
import React from 'react';
import CreateGameButton from './CreateGameButton';
import JoinGameButton from './JoinGameButton';

const LandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Game</h1>
      <div className="flex">
        <CreateGameButton/>
        <JoinGameButton />
      </div>
    </main>
  );
};

export default LandingPage;