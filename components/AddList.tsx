"use client";

import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";

type Props = {
  setIsAddingList: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddList: React.FC<Props> = ({ setIsAddingList }) => {
  const { addList } = useBoard();

  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle);
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  return (
    <div className="lists-wrapper__add-list-form">
      <input
        autoFocus
        placeholder="Enter list title..."
        className="w-full p-2 rounded border-2 border-blue-500 mb-2 outline-none text-sm"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddList()}
      />
      <div className="buttons">
        <button onClick={handleAddList} className="add-btn">
          Add List
        </button>
        <button onClick={() => setIsAddingList(false)} className="cancel-btn">
          <svg viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddList;
