import { useEffect, useState } from "react";
import { getAppData } from "../utils/getAppData";
import { AppData } from "../types";

export default function useFilter() {
  const appJSON = getAppData();
  let appData: AppData = {
    todos: [
      {
        id: "message_one",
        isCompleted: false,
        text: "You cannot drag and drop todos in 'active' or 'completed' filter!",
      },
      {
        id: "message_two",
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

  const [filter, setFilter] = useState<"all" | "active" | "completed">(
    appData.settings.currentFilter,
  );

  useEffect(() => {
    const appData = getAppData() as AppData;
    appData.settings.currentFilter = filter;
    localStorage.setItem("todo_app_data", JSON.stringify(appData));
  }, [filter]);

  return [filter, setFilter] as const;
}
