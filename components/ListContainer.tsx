"use client";

import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "@/hooks/useBoard";
import dynamic from "next/dynamic";

const CardItemNoSSR = dynamic(() => import("./CardItem"), { ssr: false });

type Props = {
  list: List;
  cards: Card[];
  isOverlay?: boolean;
};

const ListContainer: React.FC<Props> = ({ list, cards, isOverlay }) => {
  const { updateListTitle, deleteList, addCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: { type: "LIST", list },
    disabled: isAddingCard || isEditing,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle);
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`list ${isOverlay ? "list--overlay" : ""}`}
    >
      <div className="list__inner">
        {/* Header */}
        <div {...attributes} {...listeners} className="list__header">
          {isEditing ? (
            <input
              autoFocus
              className="list__title-input"
              value={list.title}
              onChange={(e) => updateListTitle(list.id, e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            />
          ) : (
            <h3 className="list__title" onClick={() => setIsEditing(true)}>
              {list.title}
            </h3>
          )}

          <button onClick={() => deleteList(list.id)} className="list__delete">
            <svg viewBox="0 0 24 24">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="list__cards">
          <SortableContext
            items={list.cardIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="list__cards-inner">
              {cards.map((card) => (
                <CardItemNoSSR key={card.id} card={card} />
              ))}
            </div>
          </SortableContext>
        </div>

        {/* Footer */}
        <div className="list__footer">
          {isAddingCard ? (
            <div className="list__add-card">
              <textarea
                autoFocus
                className="list__textarea"
                placeholder="Enter a title for this card..."
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddCard();
                  }
                }}
              />

              <div className="list__actions">
                <button onClick={handleAddCard} className="list__btn-primary">
                  create card
                </button>
                <button
                  onClick={() => setIsAddingCard(false)}
                  className="list__btn-icon"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCard(true)}
              className="list__add-trigger"
            >
              <span>+</span> Add a card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
