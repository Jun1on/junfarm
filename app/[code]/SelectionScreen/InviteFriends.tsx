"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

const InviteFriends = ({ code }: { code: String }) => {
  const [buttonText, setButtonText] = useState("Copy");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`https://jun.farm/${code}`);
    setButtonText("Copied!");

    // Reset the button text after a delay
    setTimeout(() => {
      setButtonText("Copy");
    }, 2000);
  };

  return (
    <div className="w-full bg-blue-700 rounded-md mb-4 p-4">
      <h3 className="text-xl font-bold mb-2">Invite Friends</h3>
      <div className="flex items-center">
        <Input
          type="text"
          value={`jun.farm/${code}`}
          className="flex-1 p-2 bg-blue-600 rounded"
          readOnly
        />
        <button
          onClick={handleCopyClick}
          className="ml-2 p-2 bg-green-500 rounded-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InviteFriends;
