import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

const Buttons = ({
  socket,
  isReady,
  allPlayersReady,
  isAdmin,
}: {
  socket: Socket;
  isReady: boolean;
  allPlayersReady: boolean;
  isAdmin: boolean;
}) => {
  const handleReady = () => {
    socket.emit("setReady", !isReady);
  };
  const handleStart = () => {
    if (allPlayersReady) {
      socket.emit("startGame");
    } else {
      toast("Not all players are ready.");
    }
  };
  return (
    <div className="flex justify-between items-center pt-4 border-t border-blue-500">
      <Button onClick={handleReady} variant={isReady ? "green" : "default"}>
        {isReady ? "I'm Ready" : "Ready Up"}
      </Button>
      <div className="opacity-70">
        {allPlayersReady
          ? isAdmin
            ? ""
            : "waiting on host to start game"
          : "not all players are ready"}
      </div>
      <Button
        onClick={handleStart}
        variant={allPlayersReady ? "default" : "ghost"}
        disabled={!isAdmin}
      >
        Start Game
      </Button>
    </div>
  );
};

export default Buttons;
