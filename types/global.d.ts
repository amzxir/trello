declare module "*.scss";
declare module "*.sass";

interface BoardContextType {
  board: BoardData;
  updateBoardTitle: (title: string) => void;
  addList: (title: string) => void;
  deleteList: (listId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  addCard: (listId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  addComment: (cardId: string, text: string) => void;
  reorderLists: (listOrder: string[]) => void;
  moveCard: (
    cardId: string,
    sourceListId: string,
    destListId: string,
    index: number
  ) => void;
  reorderCards: (listId: string, cardIds: string[]) => void;
}

interface Comments {
  id: string;
  text: string;
  createdAt: number;
  author: string;
}

interface Card {
  id: string;
  title: string;
  description?: string;
  comments: Comments[];
  listId: string;
}

interface List {
  id: string;
  title: string;
  cardIds: string[];
}

interface BoardData {
  title: string;
  lists: Record<string, List>;
  cards: Record<string, Card>;
  listOrder: string[];
}

type DndType = "LIST" | "CARD";
