import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { months } from "../lib/types/month";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { CardContext } from "../context/cards";
import { PickedDate } from "./TodoForm";

export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  dueDate?: PickedDate;
};

const getDisplayDate = (date: Date | PickedDate | undefined) => {
  return date
    ? `${months[(date as Date).getMonth()]} ${(date as Date).getDate()}th ${(
        date as Date
      ).getFullYear()}, ${(date as Date).getHours()}:${(
        date as Date
      ).getMinutes()}`
    : "";
};

function TodoCard(props: Todo) {
  const { id, title, description, createdAt, dueDate } = props;
  const [markedDone, setMarkedDone] = useState(false);
  const { dispatch } = useContext(CardContext);

  return (
    <>
      <Card className={`${markedDone ? "text-gray-400" : ""} min-w-[300px] basis-0 shrink`}>
        <CardHeader>
          <CardTitle className={`${markedDone ? "line-through" : ""}`}>
            {title}
          </CardTitle>
          <CardDescription className={`${markedDone ? "line-through" : ""}`}>
            ID: {id} <br />
            Created at: {getDisplayDate(createdAt)} <br />
            Due: {getDisplayDate(dueDate)}
          </CardDescription>
        </CardHeader>
        <CardContent className={`flex flex-col space-y-4`}>
          <p className={`${markedDone ? "line-through" : ""}`}>{description}</p>
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={() => {
                setMarkedDone(!markedDone);
              }}
            />
            <p>Mark as completed</p>
          </div>
          <div>
            <Button
              className="space-x-2 pl-3 text-white"
              variant="outline"
              onClick={() => {
                dispatch({ type: "remove", payload: id });
              }}
            >
              <Trash2 size={18} />
              <p>Delete</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export { TodoCard as Todo };
