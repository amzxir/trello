"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardModal from "./CardModal";

type Props = {
  card: Card;
  isOverlay?: boolean;
};

const CardItem: React.FC<Props> = ({ card, isOverlay }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "CARD", card, listId: card.listId },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const handleCardClick = () => {
    if (!isDragging) {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={handleCardClick}
        className={`card ${isOverlay ? "card--overlay" : ""}`}
      >
        <div className="card__content">
          <div className="card__title">
            <span>{card.title}</span>
          </div>

          <div className="card__meta">
            {card.description && (
              <svg viewBox="0 0 24 24" className="card__icon">
                <path d="M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z" />
              </svg>
            )}

            <div className="card__comments">
              Comments {""}
              {card.comments.length}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CardModal card={card} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default CardItem;
