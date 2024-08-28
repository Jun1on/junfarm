"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const SelectionScreen = dynamic(
  () => import("./SelectionScreen/SelectionScreen"),
  {
    ssr: false,
  }
);
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import io from "socket.io-client";
const config = require("@/config.json");
const getUsername = require("@/utils/getUsername");

export default function Home() {
  const code = usePathname().substring(1).toUpperCase();
  const [socket, setSocket] = useState(io(config.api));
  const username = getUsername();

  useEffect(() => {
    socket.emit("setClient", {
      code,
      username,
      displayName: localStorage.getItem("displayName"),
    });
  }, [socket]);

  useEffect(() => {
    socket.on("toast", (message: string) => {
      toast(message);
    });

    socket.on("duplicatePlayer", ({ duplicateUsername, id }) => {
      if (username === duplicateUsername) {
        if (id === socket.id) {
          // joining from different tab
        } else if (socket.id !== undefined) {
          socket.disconnect();

          document.body.innerHTML += `
            <div id="transparent-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
            <div style="position: fixed; bottom: 20px; right: 20px; background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 8px; z-index: 1000; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
              You joined from a different tab. Navigate to that tab or <a href="javascript:location.reload()" style="color:cyan; text-decoration:underline;">refresh this one</a>.
            </div>
          `;
        }
      }
    });

    return () => {
      socket.off("toast");
    };
  }, [socket]);

  return (
    <>
      <Toaster />
      <SelectionScreen socket={socket} username={username} code={code} />
    </>
  );
}
