import { Dispatch, createContext } from "react";
import { Todo } from "../components/TodoCard";

type CardsReducerAction =
  | {
      type: "add";
      payload: Todo;
    }
  | {
      type: "remove";
      payload: Todo["id"];
    };

function makeID() {
  return (
    Math.floor(Date.now() / 1000).toString(16) +
    " "
      .repeat(16)
      .replace(/./g, () => Math.floor(Math.random() * 16).toString(16))
  );
}

function cardsReducer(cards: Todo[], action: CardsReducerAction): Todo[] {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      return [
        ...cards,
        {
          id: makeID(),
          title: payload.title,
          description: payload.description,
          createdAt: payload.createdAt,
          dueDate: payload.dueDate,
        },
      ];
    }
    case "remove": {
      return cards.filter((card) => card.id !== payload);
    }
    default: {
      return cards;
    }
  }
}

type CardContext = {
  state: Todo[];
  dispatch: Dispatch<CardsReducerAction>;
};

export const CardContext = createContext<CardContext>({
  state: [],
  //@ts-ignore
  dispatch: (...args: any[]) => {},
});

export { cardsReducer };
