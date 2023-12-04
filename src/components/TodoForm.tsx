import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import DateTimePicker from "react-datetime-picker";
import { Todo } from "./TodoCard";
import { Button } from "./ui/button";
import { CardContext } from "../context/cards";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Check } from "lucide-react";

type Field = {
  label: keyof Todo;
  placeholder?: string;
  todoState: [Todo, Dispatch<SetStateAction<Todo>>];
  dateState?: [PickedDate, Dispatch<SetStateAction<PickedDate>>];
};

export type PickedDate = (Date | null) | [Date | null, Date | null];

function DateField({
  label,
  state,
}: {
  label: string;
  state: [PickedDate, Dispatch<SetStateAction<PickedDate>>];
}) {
  const [date, setDate] = state;
  return (
    <>
      <Label htmlFor={label} className="mr-2">
        {label.slice(0, 1).toUpperCase() + label.slice(1)}
      </Label>
      <DateTimePicker className="mr-2 mb-2" onChange={setDate} value={date} />
    </>
  );
}

function TextField({ label, placeholder, todoState }: Field) {
  const [todo, setTodo] = todoState;
  return (
    <>
      <Label htmlFor={label}></Label>
      {label.slice(0, 1).toUpperCase() + label.slice(1)}
      <Input
        className="mb-2"
        id={label}
        placeholder={placeholder}
        onChange={(e) => {
          setTodo({
            ...todo,
            [label]: e.target.value,
          });
        }}
      />
    </>
  );
}

function TodoForm({ update }: { update?: React.DispatchWithoutAction }) {
  const [todo, setTodo] = useState<Todo>({} as Todo);
  const [date, setDate] = useState<PickedDate>(new Date());
  const { dispatch } = useContext(CardContext);

  return (
    <div className="p-4 border rounded-md">
      <TextField label="title" todoState={[todo, setTodo]} />
      <TextField label="description" todoState={[todo, setTodo]} />
      <DateField label="due for" state={[date, setDate]} />
      <div className="flex flex-row items-center justify-center">
        <Button
          className="pl-3"
          variant="outline"
          onClick={() => {
            dispatch({
              type: "add",
              payload: {
                ...todo,
                createdAt: new Date(Date.now()),
                dueDate: date,
              },
            });
            update ? update() : null;
            // console.log(state);
          }}
        >
          <Check size={18} className="mr-1" />
          Submit
        </Button>
      </div>
    </div>
  );
}

export { TodoForm };
