"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Modal from './Modal'; // Adjust the import path according to your project structure

const JoinGameButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleJoinGame = (roomCode) => {
    if (roomCode && roomCode.length === 4) {
      router.push(`/${roomCode.toUpperCase()}`);
      setIsModalOpen(false);
    } else {
      alert('Invalid room code. Please enter a 4-character code.');
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="secondary">
        Join Game
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJoinGame}
      />
    </>
  );
};

export default JoinGameButton;