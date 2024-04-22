import { useEffect, useState } from "react";
import { AppData } from "../types";
import { getAppData } from "../utils/getAppData";

export default function useDark() {
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
  const [isDark, setIsDark] = useState(appData.settings.isDark);

  useEffect(() => {
    const appData = getAppData() as AppData;
    if (isDark) {
      document.body.className = "dark";
      appData.settings.isDark = true;
      localStorage.setItem("todo_app_data", JSON.stringify(appData));
    } else {
      document.body.className = "light";
      appData.settings.isDark = false;
      localStorage.setItem("todo_app_data", JSON.stringify(appData));
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
