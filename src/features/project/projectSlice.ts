import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from "uuid";

// type
import { IProject } from "src/types/project";

export interface ProjectState {
  projects: IProject[] | [];
  active: IProject | null;
}

const initialState: ProjectState = {
  projects: [],
  active: null
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    create_project: (
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      state.projects = [
        ...state.projects,
        {
          ...action.payload,
          id: uuid.v4(),
          tasks: [],
          created_at: new Date().getTime()
        }
      ];

      if (state.projects.length === 1) {
        state.active = state.projects[0];
      }
    },
    switch_project: (state, action: PayloadAction<string>) => {
      state.active = state.projects.find(p => p.id === action.payload) || null;
    },
    remove_project: (state, action: PayloadAction<string>) => {
      state.projects = state.projects?.filter(
        project => project.id !== action.payload
      );
    }
  }
});

export const { create_project, switch_project, remove_project } =
  projectSlice.actions;
export default projectSlice.reducer;
