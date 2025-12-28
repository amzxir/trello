"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

const INITIAL_DATA: BoardData = {
  title: "My Workspace",
  lists: {
    "list-1": { id: "list-1", title: "To Do", cardIds: ["card-1", "card-2"] },
    "list-2": { id: "list-2", title: "In Progress", cardIds: ["card-3"] },
    "list-3": { id: "list-3", title: "Done", cardIds: [] },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Research competitors",
      comments: [],
      listId: "list-1",
    },
    "card-2": {
      id: "card-2",
      title: "Draft marketing plan",
      comments: [],
      listId: "list-1",
    },
    "card-3": {
      id: "card-3",
      title: "Setup CI/CD pipeline",
      comments: [],
      listId: "list-2",
    },
  },
  listOrder: ["list-1", "list-2", "list-3"],
};

export const BoardContext = createContext<BoardContextType | undefined>(
  undefined
);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<BoardData>(INITIAL_DATA);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("trello-clone-data");
      if (saved) {
        setBoard(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    setBoard((prev) => ({ ...prev }));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("trello-clone-data", JSON.stringify(board));
    }
  }, [board]);

  const updateBoardTitle = useCallback((title: string) => {
    setBoard((prev) => ({ ...prev, title }));
  }, []);

  const addList = useCallback((title: string) => {
    const id = `list-${Date.now()}`;
    const newList: List = { id, title, cardIds: [] };
    setBoard((prev) => ({
      ...prev,
      lists: { ...prev.lists, [id]: newList },
      listOrder: [...prev.listOrder, id],
    }));
  }, []);

  const deleteList = useCallback((listId: string) => {
    setBoard((prev) => {
      const newListOrder = prev.listOrder.filter((id) => id !== listId);
      const newLists = { ...prev.lists };
      const newCards = { ...prev.cards };

      // Remove cards associated with this list
      prev.lists[listId].cardIds.forEach((cardId) => {
        delete newCards[cardId];
      });
      delete newLists[listId];

      return {
        ...prev,
        listOrder: newListOrder,
        lists: newLists,
        cards: newCards,
      };
    });
  }, []);

  const updateListTitle = useCallback((listId: string, title: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: {
        ...prev.lists,
        [listId]: { ...prev.lists[listId], title },
      },
    }));
  }, []);

  const addCard = useCallback((listId: string, title: string) => {
    const id = `card-${Date.now()}`;
    const newCard: Card = { id, title, comments: [], listId };
    setBoard((prev) => ({
      ...prev,
      cards: { ...prev.cards, [id]: newCard },
      lists: {
        ...prev.lists,
        [listId]: {
          ...prev.lists[listId],
          cardIds: [...prev.lists[listId].cardIds, id],
        },
      },
    }));
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    setBoard((prev) => {
      const card = prev.cards[cardId];
      if (!card) return prev;
      const listId = card.listId;
      const newCards = { ...prev.cards };
      delete newCards[cardId];

      return {
        ...prev,
        cards: newCards,
        lists: {
          ...prev.lists,
          [listId]: {
            ...prev.lists[listId],
            cardIds: prev.lists[listId].cardIds.filter((id) => id !== cardId),
          },
        },
      };
    });
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<Card>) => {
    setBoard((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardId]: { ...prev.cards[cardId], ...updates },
      },
    }));
  }, []);

  const addComment = useCallback((cardId: string, text: string) => {
    const comment: Comments = {
      id: `comment-${Date.now()}`,
      text,
      createdAt: Date.now(),
      author: "User",
    };
    setBoard((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardId]: {
          ...prev.cards[cardId],
          comments: [comment, ...prev.cards[cardId].comments],
        },
      },
    }));
  }, []);

  const reorderLists = useCallback((listOrder: string[]) => {
    setBoard((prev) => ({ ...prev, listOrder }));
  }, []);

  const moveCard = useCallback(
    (
      cardId: string,
      sourceListId: string,
      destListId: string,
      index: number
    ) => {
      setBoard((prev) => {
        const sourceList = prev.lists[sourceListId];
        const destList = prev.lists[destListId];
        const newSourceCardIds = sourceList.cardIds.filter(
          (id) => id !== cardId
        );
        const newDestCardIds = Array.from(destList.cardIds);

        // If same list, remove first then add
        if (sourceListId === destListId) {
          const cleaned = sourceList.cardIds.filter((id) => id !== cardId);
          cleaned.splice(index, 0, cardId);
          return {
            ...prev,
            lists: {
              ...prev.lists,
              [sourceListId]: { ...sourceList, cardIds: cleaned },
            },
          };
        }

        newDestCardIds.splice(index, 0, cardId);

        return {
          ...prev,
          cards: {
            ...prev.cards,
            [cardId]: { ...prev.cards[cardId], listId: destListId },
          },
          lists: {
            ...prev.lists,
            [sourceListId]: { ...sourceList, cardIds: newSourceCardIds },
            [destListId]: { ...destList, cardIds: newDestCardIds },
          },
        };
      });
    },
    []
  );

  const reorderCards = useCallback((listId: string, cardIds: string[]) => {
    setBoard((prev) => {
      const updatedCards = { ...prev.cards };

      cardIds.forEach((cardId) => {
        updatedCards[cardId] = { ...updatedCards[cardId], listId };
      });

      return {
        ...prev,
        cards: updatedCards,
        lists: {
          ...prev.lists,
          [listId]: { ...prev.lists[listId], cardIds },
        },
      };
    });
  }, []);

  return (
    <BoardContext.Provider
      value={{
        board,
        updateBoardTitle,
        addList,
        deleteList,
        updateListTitle,
        addCard,
        deleteCard,
        updateCard,
        addComment,
        reorderLists,
        moveCard,
        reorderCards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
