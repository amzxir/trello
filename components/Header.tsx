"use client";

import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";

const Header = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { board, updateBoardTitle } = useBoard();
  return (
    <div className="board-container__header">
      {isEditingTitle ? (
        <input
          autoFocus
          className="board-container__header-title-input"
          value={board.title}
          onChange={(e) => updateBoardTitle(e.target.value)}
          onBlur={() => setIsEditingTitle(false)}
          onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
        />
      ) : (
        <h2
          className="board-container__header-title-text"
          onClick={() => setIsEditingTitle(true)}
        >
          {board.title}
        </h2>
      )}
    </div>
  );
};

export default Header;
