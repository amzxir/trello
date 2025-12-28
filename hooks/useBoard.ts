import { BoardContext } from "@/context/boardContext";
import { useContext } from "react";

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within BoardProvider");
  return context;
};
