import CircleBox from "./CircleBox";
import { RxCross1 } from "react-icons/rx";
import type { TodoType } from "../types";

interface TodoProps extends TodoType {
  index: number;
  allowDrag: boolean;
  isTouch: boolean;
  toggleActive: (id: string) => void;
  deleteTodo: (id: string) => void;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}

const Todo = ({
  index,
  id,
  text,
  isCompleted,
  allowDrag,
  isTouch,
  deleteTodo,
  toggleActive,
  onDragStart,
  onDrop,
}: TodoProps) => {
  return (
    <li
      data-index={index}
      draggable={allowDrag}
      className={`group relative flex min-h-10 w-full cursor-grab select-none items-center border-b border-border py-2 transition-all duration-150 ${!isTouch && "hover:bg-light-grey"} ${isCompleted ? "text-light-greyish-blue line-through" : "text-primary"}`}
      onClick={() => toggleActive(id)}
      onDragEnter={(e) => {
        e.currentTarget.children[1].classList.add("pointer-events-none");
        e.currentTarget.classList.add("scale-95");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("scale-95");
        e.currentTarget.children[1].classList.remove("pointer-events-none");
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragStart={() => {
        onDragStart(index);
      }}
      onDrop={(e) => {
        e.currentTarget.classList.remove("scale-95");
        onDrop(index);
      }}
    >
      <CircleBox
        type={isCompleted ? "active" : "default"}
        isTouch={isTouch}
      ></CircleBox>
      <span className="mr-3 grow">{text}</span>
      <div
        className={`${!isTouch && "absolute right-0 hidden group-hover:flex"} h-full w-9 shrink-0 cursor-default items-center justify-center transition-all duration-150 ${!isTouch && "group-hover:bg-light-grey"}`}
      >
        <RxCross1
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(id);
          }}
          className="cursor-pointer text-primary transition-all duration-150 hover:scale-125 hover:text-red-500"
          size={20}
        ></RxCross1>
      </div>
    </li>
  );
};

export default Todo;
