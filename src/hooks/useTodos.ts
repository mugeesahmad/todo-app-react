import { useEffect, useState } from "react";
import type { AppData, TodoType } from "../types";
import { getAppData } from "../utils/getAppData";
import { produce } from "immer";
import { nanoid } from "nanoid";

export default function useTodos() {
  const appJSON = getAppData();
  let appData: AppData = {
    todos: [
      {
        id: "secret",
        isCompleted: false,
        text: "You cannot drag and drop todos in 'active' or 'completed' filter!",
      },
      {
        id: "message",
        isCompleted: false,
        text: "Click on todo to mark it as completed or not completed!",
      },
    ],
    settings: { isDark: false, currentFilter: "all" },
  };

  if (appJSON != null) {
    appData = { ...appData, ...appJSON };
  } else {
    localStorage.setItem("todo_app_data", JSON.stringify(appData));
  }

  const [todos, setTodos] = useState<TodoType[]>(appData.todos);

  useEffect(() => {
    const appData = getAppData() as AppData;
    appData.todos = todos;
    localStorage.setItem("todo_app_data", JSON.stringify(appData));
  }, [todos]);

  // Functions for manipulation of todos
  function addTodo(todo: string) {
    setTodos((prevTodos) => {
      return [{ id: nanoid(6), text: todo, isCompleted: false }, ...prevTodos];
    });
  }

  function toggleActive(id: string) {
    const newTodos = produce(todos, (draftState) => {
      const index = draftState.findIndex((todo) => {
        return todo.id === id;
      });
      draftState[index].isCompleted = !draftState[index].isCompleted;
    });
    setTodos(newTodos);
  }

  function deleteTodo(id: string) {
    const newTodos = produce(todos, (draftState) => {
      const index = draftState.findIndex((todo) => todo.id === id);
      draftState.splice(index, 1);
    });
    setTodos(newTodos);
  }

  function deleteCompletedTodos() {
    const newTodos = produce(todos, (draftState) => {
      return draftState.filter((todo) => {
        if (!todo.isCompleted) return todo;
      });
    });

    setTodos(newTodos);
  }

  return [
    todos,
    setTodos,
    { addTodo, toggleActive, deleteTodo, deleteCompletedTodos },
  ] as const;
}
