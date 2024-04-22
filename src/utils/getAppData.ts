import { AppData } from "../types";

// Helper function to get app data from the local storage
export function getAppData(): AppData | null {
  const appJSON = localStorage.getItem("todo_app_data");
  if (appJSON != null) return JSON.parse(appJSON);
  return null;
}
