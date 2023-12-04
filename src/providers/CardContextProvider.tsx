import { useReducer } from "react";
import { CardContext, cardsReducer } from "../context/cards";

function CardContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(cardsReducer, []);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
}

export { CardContextProvider };
