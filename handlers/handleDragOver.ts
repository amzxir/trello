import { DragOverEvent } from "@dnd-kit/core";

export const handleDragOver = (
  event: DragOverEvent,
  board: any,
  activeType: "LIST" | "CARD" | null,
  moveCard: (
    cardId: string,
    fromList: string,
    toList: string,
    index: number
  ) => void
) => {
  const { active, over } = event;
  if (!over || activeType !== "CARD") return;

  const activeId = active.id as string;
  const overId = over.id as string;

  const activeContainer = active.data.current?.listId;
  const overContainer = over.data.current?.listId;

  if (!activeContainer || !overContainer || activeContainer === overContainer)
    return;

  const overList = board.lists[overContainer];
  if (!overList) return;

  const overIndex = overList.cardIds.indexOf(overId);
  const newIndex = overIndex >= 0 ? overIndex : overList.cardIds.length;

  moveCard(activeId, activeContainer, overContainer, newIndex);
};
