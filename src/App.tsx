import { useReducer } from "react";
import { Todo } from "./components/TodoCard";
import { TodoForm } from "./components/TodoForm";
import { CardContext, cardsReducer } from "./context/cards";

function App() {
  const [state, dispatch] = useReducer(cardsReducer, []);
  return (
    <>
      <CardContext.Provider value={{ state, dispatch }}>
        <div className="p-12">
          <h1 className=" text-2xl mb-3 pb-1 border-b">Todos</h1>
          <>
            <div className="flex flex-row overflow-x-auto space-x-4">
              {state.map((todo) => {
                return (
                  <Todo
                    key={`${todo.id}_${todo.createdAt?.getSeconds()}`}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    createdAt={todo.createdAt}
                    dueDate={todo.dueDate}
                  />
                );
              })}
            </div>
          </>
        </div>
        <div className="lg:max-w-[50%] w-full p-12">
          <h1 className=" text-2xl mb-3 pb-1 border-b">Add Todo</h1>
          <TodoForm />
        </div>
      </CardContext.Provider>
    </>
  );
}

export default App;
