import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// slices
import projectReducer from "src/features/project/projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
