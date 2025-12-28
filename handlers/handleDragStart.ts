import { DragStartEvent } from "@dnd-kit/core";

export const handleDragStart = (
  event: DragStartEvent,
  board: BoardData,
  setActiveId: (id: string | null) => void,
  setActiveType: (type: "LIST" | "CARD" | null) => void
) => {
  const id = event.active.id as string;
  setActiveId(id);

  const isList = board.listOrder.includes(id);
  setActiveType(isList ? "LIST" : "CARD");
};
