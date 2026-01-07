"use client";

import { useMemo, useState } from "react";

type Screen = "home" | "create" | "join" | "lobby";

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function cleanCode(s: string) {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [roomCode, setRoomCode] = useState<string>("");
  const [joinInput, setJoinInput] = useState<string>("");

  const canJoin = useMemo(() => cleanCode(joinInput).length === 6, [joinInput]);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui", maxWidth: 520, margin: "0 auto" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Allowance</h1>
        <p style={{ marginTop: 6, opacity: 0.75 }}>Phone version – lobby first.</p>
      </header>

      {screen === "home" && (
        <section>
          <button
            style={{ width: "100%", padding: 14, marginBottom: 10, fontSize: 16 }}
            onClick={() => {
              const code = makeRoomCode();
              setRoomCode(code);
              setScreen("create");
            }}
          >
            Create Game
          </button>

          <button
            style={{ width: "100%", padding: 14, fontSize: 16 }}
            onClick={() => {
              setJoinInput("");
              setScreen("join");
            }}
          >
            Join Game
          </button>
        </section>
      )}

      {screen === "create" && (
        <section>
          <h2 style={{ marginTop: 0 }}>Room created</h2>
          <p style={{ margin: "8px 0" }}>Send this code to your friends:</p>

          <div
            style={{
              fontSize: 32,
              letterSpacing: 6,
              padding: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              textAlign: "center",
              marginBottom: 12,
              userSelect: "all",
            }}
          >
            {roomCode}
          </div>

          <button
            style={{ width: "100%", padding: 14, marginBottom: 10, fontSize: 16 }}
            onClick={() => setScreen("lobby")}
          >
            Continue to Lobby
          </button>

          <button style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={() => setScreen("home")}>
            Back
          </button>
        </section>
      )}

      {screen === "join" && (
        <section>
          <h2 style={{ marginTop: 0 }}>Join a room</h2>

          <label style={{ display: "block", marginBottom: 8 }}>
            Room code
            <input
              value={joinInput}
              onChange={(e) => setJoinInput(cleanCode(e.target.value))}
              placeholder="ABC123"
              inputMode="text"
              autoCapitalize="characters"
              autoCorrect="off"
              style={{
                width: "100%",
                marginTop: 8,
                padding: 12,
                fontSize: 18,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "inherit",
              }}
            />
          </label>

          <button
            style={{ width: "100%", padding: 14, marginBottom: 10, fontSize: 16, opacity: canJoin ? 1 : 0.5 }}
            disabled={!canJoin}
            onClick={() => {
              setRoomCode(cleanCode(joinInput));
              setScreen("lobby");
            }}
          >
            Join
          </button>

          <button style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={() => setScreen("home")}>
            Back
          </button>
        </section>
      )}

      {screen === "lobby" && (
        <section>
          <h2 style={{ marginTop: 0 }}>Lobby</h2>
          <p style={{ margin: "8px 0" }}>
            Room: <strong>{roomCode || "—"}</strong>
          </p>

          <div
            style={{
              padding: 12,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <p style={{ margin: 0, opacity: 0.8 }}>
              Next: we connect phones so everyone in this room sees the same game.
            </p>
          </div>

          <button style={{ width: "100%", padding: 14, marginBottom: 10, fontSize: 16 }} onClick={() => setScreen("home")}>
            Home
          </button>
        </section>
      )}
    </main>
  );
}
