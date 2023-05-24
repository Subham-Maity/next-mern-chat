"use client";
import MessagesContainer from "@/app/containers/Messages";
import RoomsContainer from "@/app/containers/Rooms";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";
import styles from "@/app/styles/Home.module.css";
import "./globals.css";
export default function Home() {
  const { socket, username, setUsername } = useSocket();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleUsername() {
    const value = usernameRef.current?.value || "";

    if (!value) return;

    setUsername(value);

    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current!.value = localStorage.getItem("username") || "";
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div>
        {!username && (
            <div className={styles.usernameWrapper}>
              <div className={styles.usernameInner}>
                <input placeholder="Username" ref={usernameRef} />
                <button onClick={handleUsername} className="cta">
                  Set Username
                </button>
              </div>
            </div>
        )}
        {username && (
            <div className={styles.container}>
              <RoomsContainer />
              <MessagesContainer />
            </div>
        )}
      </div>
  );
}
