import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const handleDragEnd = (
  event: DragEndEvent,
  board: BoardData,
  activeType: "LIST" | "CARD" | null,
  reorderLists: (listOrder: string[]) => void,
  reorderCards: (listId: string, cardIds: string[]) => void,
  setActiveId: (id: string | null) => void,
  setActiveType: (type: "LIST" | "CARD" | null) => void
) => {
  const { active, over } = event;

  setActiveId(null);
  setActiveType(null);

  if (!over) return;

  const activeId = active.id as string;
  const overId = over.id as string;

  if (activeType === "LIST") {
    if (activeId !== overId) {
      const oldIndex = board.listOrder.indexOf(activeId);
      const newIndex = board.listOrder.indexOf(overId);
      reorderLists(arrayMove(board.listOrder, oldIndex, newIndex));
    }
    return;
  }

  const activeCard = board.cards[activeId];
  if (!activeCard) return;

  const activeContainer = activeCard.listId;
  const overCard = board.cards[overId];
  const overList = board.lists[overId];

  if (overCard) {
    const overContainer = overCard.listId;
    const sourceList = board.lists[activeContainer];
    const destinationList = board.lists[overContainer];

    if (!sourceList || !destinationList) return;

    if (activeContainer === overContainer && activeId !== overId) {
      reorderCards(
        activeContainer,
        arrayMove(
          sourceList.cardIds,
          sourceList.cardIds.indexOf(activeId),
          sourceList.cardIds.indexOf(overId)
        )
      );
    } else if (activeContainer !== overContainer) {
      reorderCards(
        activeContainer,
        sourceList.cardIds.filter((id:string) => id !== activeId)
      );
      reorderCards(overContainer, [
        ...destinationList.cardIds.slice(
          0,
          destinationList.cardIds.indexOf(overId)
        ),
        activeId,
        ...destinationList.cardIds.slice(
          destinationList.cardIds.indexOf(overId)
        ),
      ]);
    }
  } else if (overList) {
    reorderCards(
      activeContainer,
      board.lists[activeContainer].cardIds.filter((id:string) => id !== activeId)
    );
    reorderCards(overList.id, [...overList.cardIds, activeId]);
  }
};
