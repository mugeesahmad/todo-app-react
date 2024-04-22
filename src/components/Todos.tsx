import { forwardRef, memo, useImperativeHandle, useMemo } from "react";
import { produce } from "immer";
import useTodos from "../hooks/useTodos";
import useFilter from "../hooks/useFilter";
import Todo from "./Todo";
import type { TodoType } from "../types";
export interface ExposeTodosRef {
  addTodo: (text: string) => void;
}

// Memoising the component so that it doesn't get rerendered whenever the theme state in the parent changes.
const Todos = memo(
  forwardRef<ExposeTodosRef>((_props, ref) => {
    const [
      todos,
      setTodos,
      { addTodo, toggleActive, deleteTodo, deleteCompletedTodos },
    ] = useTodos();

    const isTouchScreen = "ontouchstart" in document.documentElement;

    useImperativeHandle(ref, () => ({
      addTodo,
    }));

    // Drag and drop related functions

    // Helper change-index function
    function changeIndex(arr: unknown[], oldIndex: number, newIndex: number) {
      const removedItem = arr.splice(oldIndex, 1)[0];
      arr.splice(newIndex, 0, removedItem);
    }

    let draggedTodoIndex: number;

    function onDragStart(id: number) {
      draggedTodoIndex = id;
    }

    function onDrop(destinationIndex: number) {
      if (draggedTodoIndex === destinationIndex) return;

      const newTodos = produce(todos, (draftState) => {
        changeIndex(draftState, draggedTodoIndex, destinationIndex);
        return draftState;
      });
      setTodos(newTodos);
    }

    const [filter, setFilter] = useFilter();
    const filteredTodos = useMemo((): TodoType[] => {
      switch (filter) {
        case "all":
          return todos;

        case "active":
          return todos.filter((todo) => {
            if (!todo.isCompleted) return todo;
          });

        case "completed":
          return todos.filter((todo) => {
            if (todo.isCompleted) return todo;
          });
      }
    }, [todos, filter]);

    // Calculates remaining pending todos
    const remainingTodos = () => {
      return todos.filter((todo) => {
        if (!todo.isCompleted) return todo;
      }).length;
    };

    return (
      <div
        className={`mt-8 w-full overflow-hidden rounded-md bg-secondary shadow-lg transition-colors duration-300`}
      >
        {filteredTodos.length > 0 ? (
          <ul className="min-h-[50vh] sm:min-h-72">
            {filteredTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                id={todo.id}
                isCompleted={todo.isCompleted}
                text={todo.text}
                toggleActive={toggleActive}
                deleteTodo={deleteTodo}
                isTouch={isTouchScreen}
                allowDrag={filter === "all"}
                onDragStart={onDragStart}
                onDrop={onDrop}
                index={index}
              ></Todo>
            ))}
          </ul>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center text-primary sm:min-h-72">
            No{" "}
            {filter == "active" || filter == "completed" ? filter : "pending"}{" "}
            todos...
          </div>
        )}
        <section className="flex w-full items-center justify-between gap-3 px-4 py-3 text-center text-xs text-primary ">
          <span>{remainingTodos()} tasks left</span>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`${filter === "all" && "text-[hsl(220,98%,61%)]"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`${filter === "active" && "text-[hsl(220,98%,61%)]"}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`${filter === "completed" && "text-[hsl(220,98%,61%)]"}`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => {
              deleteCompletedTodos();
            }}
          >
            Clear Completed
          </button>
        </section>
      </div>
    );
  }),
);

export default Todos;
