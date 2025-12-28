"use client";

import TrelloBoard from "@/components/TrelloBoard";
import { BoardProvider } from "@/context/boardContext";

export default function Home() {
  return (
    <BoardProvider>
      <div className="app">
        <main className="app__content">
          <TrelloBoard />
        </main>
      </div>
    </BoardProvider>
  );
}
