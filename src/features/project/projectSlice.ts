import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from "uuid";

// type
import { IProject } from "src/types/project";

export interface ProjectState {
  projects: IProject[] | [];
  active: IProject | null;
  project_modal_visibility: boolean;
}

const initialState: ProjectState = {
  projects: [],
  active: null,
  project_modal_visibility: false
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    create_project: (
      state,
      action: PayloadAction<{
        name: string;
        description: string;
        avatar: string;
      }>
    ) => {
      const project = {
        ...action.payload,
        id: uuid.v4(),
        tasks: [],
        created_at: new Date().getTime()
      };

      state.projects = [...state.projects, ...[project]];

      state.active = project;
    },
    switch_project: (state, action: PayloadAction<string>) => {
      state.active = state.projects.find(p => p.id === action.payload) || null;
    },
    remove_project: (state, action: PayloadAction<string>) => {
      state.projects = state.projects?.filter(
        project => project.id !== action.payload
      );
    },
    create_project_modal: (state, action: PayloadAction<boolean>) => {
      state.project_modal_visibility = action.payload;
    }
  }
});

export const {
  create_project,
  switch_project,
  remove_project,
  create_project_modal
} = projectSlice.actions;
export default projectSlice.reducer;
