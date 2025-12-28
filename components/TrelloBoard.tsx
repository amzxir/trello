"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import { useBoard } from "@/hooks/useBoard";
import dynamic from "next/dynamic";
import Header from "./Header";
import AddList from "./AddList";
import { handleDragStart } from "@/handlers/handleDragStart";
import { handleDragOver } from "@/handlers/handleDragOver";
import { handleDragEnd } from "@/handlers/handleDragEnd";

const ListContainerNoSSR = dynamic(() => import("./ListContainer"), {
  ssr: false,
});

const TrelloBoard: React.FC = () => {
  const { board, reorderLists, moveCard, reorderCards } = useBoard();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<"LIST" | "CARD" | null>(null);
  const [isAddingList, setIsAddingList] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeCard = activeId ? board.cards[activeId] : null;
  const activeList = activeId ? board.lists[activeId] : null;

  return (
    <div className="board-container">
      <Header />

      <div className="board-container__content">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(e) =>
            handleDragStart(e, board, setActiveId, setActiveType)
          }
          onDragOver={(e) => handleDragOver(e, board, activeType, moveCard)}
          onDragEnd={(e) =>
            handleDragEnd(
              e,
              board,
              activeType,
              reorderLists,
              reorderCards,
              setActiveId,
              setActiveType
            )
          }
        >
          <div className="lists-wrapper">
            <SortableContext
              items={board.listOrder}
              strategy={horizontalListSortingStrategy}
            >
              {board.listOrder.map((listId) => (
                <ListContainerNoSSR
                  key={listId}
                  list={board.lists[listId]}
                  cards={board.lists[listId].cardIds.map(
                    (id) => board.cards[id]
                  )}
                />
              ))}
            </SortableContext>

            <div className="lists-wrapper__add-list">
              {isAddingList ? (
                <AddList setIsAddingList={setIsAddingList} />
              ) : (
                <button
                  onClick={() => setIsAddingList(true)}
                  className="lists-wrapper__add-list-button"
                >
                  <span>+</span> Add another list
                </button>
              )}
            </div>
          </div>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: { opacity: "0.5" },
                },
              }),
            }}
          >
            {activeId ? (
              activeType === "LIST" ? (
                activeList ? (
                  <div style={{ width: "18rem" }}>
                    <ListContainerNoSSR
                      list={activeList}
                      cards={activeList.cardIds.map((id) => board.cards[id])}
                      isOverlay
                    />
                  </div>
                ) : null
              ) : activeCard ? (
                <CardItem card={activeCard} isOverlay />
              ) : null
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default TrelloBoard;
