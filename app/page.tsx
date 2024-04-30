"use client";

import { useState } from "react";
import GameBoard from "./(gameboard)";
import Navbar from "./(navbar)";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      {gameStarted ? (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      ) : (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      )}

      <Navbar />
      <div className="w-screen h-screen flex items-center justify-center">
        <GameBoard gameStarted={setGameStarted} />
      </div>
    </main>
  );
}
