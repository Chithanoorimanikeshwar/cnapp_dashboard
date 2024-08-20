import { configureStore } from "@reduxjs/toolkit";
import dashboard from "./features/dashboard/dashboard";
export const store = configureStore({
  reducer: {
    cnapp_dashboard:dashboard,
  },
});
