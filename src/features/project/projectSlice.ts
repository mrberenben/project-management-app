import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from "uuid";

// type
import { IProject } from "src/types/project";
import { Priority, Status, Type } from "src/types/task";

export interface ProjectState {
  projects: IProject[] | [];
  active: IProject | null;
  project_modal_visibility: boolean;
  task_modal: {
    visibility: boolean;
    status: Status | null;
  };
}

const initialState: ProjectState = {
  projects: [],
  active: null,
  project_modal_visibility: true,
  task_modal: {
    visibility: false,
    status: null
  }
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
    },
    create_task_modal: (
      state,
      action: PayloadAction<{ visibility: boolean; status?: Status }>
    ) => {
      state.task_modal = {
        visibility: action.payload.visibility,
        ...(action.payload.status
          ? { status: action.payload.status }
          : { status: null })
      };
    },
    create_task: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        type: Type;
        priority: Priority;
        status: Status;
      }>
    ) => {
      const task = {
        ...action.payload,
        id: uuid.v4(),
        created_at: new Date().getTime()
      };

      const active = state.projects.find(p => p.id === state.active?.id);

      if (active) {
        active.tasks.push(task);
      }
    }
  }
});

export const {
  create_project,
  switch_project,
  remove_project,
  create_project_modal,
  create_task_modal,
  create_task
} = projectSlice.actions;
export default projectSlice.reducer;
