export interface AppData {
  todos: TodoType[];
  settings: { isDark: boolean; currentFilter: "all" | "active" | "completed" };
}

export interface TodoType {
  text: string;
  isCompleted: boolean;
  id: string;
}
