"use client";

import React, { useState } from "react";
import { useBoard } from "@/hooks/useBoard";

type Props = {
  card: Card;
  onClose: () => void;
};

const CardModal: React.FC<Props> = ({ card, onClose }) => {
  const { addComment } = useBoard();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(card.id, commentText);
      setCommentText("");
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card-modal__overlay" onClick={onClose}>
      <div
        className="card-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="card-modal__close" onClick={onClose}>
          <svg viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>

        <div className="card-modal__main">
          <div className="card-modal__section">
            <div className="flex-1">
              <h3 className="card-modal__block-header">
                Comments for "Review Drag & Drop"
              </h3>
              {card.comments.map((comment) => (
                <div key={comment.id} className="card-modal__body">
                  <div>{comment.author[0].toUpperCase()}</div>
                  <div>
                    <div>
                      <span>{comment.author}</span>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                    <div>{comment.text}</div>
                  </div>
                </div>
              ))}
              <textarea
                className="card-modal__title-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
