import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from "uuid";

// type
import { IProject } from "src/types/project";
import { Priority, Status, Type } from "src/types/task.d";

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

type ProjectPayload = {
  name: string;
  description: string;
  avatar: string;
};

type TaskPayload = {
  title: string;
  description: string;
  type: Type;
  priority: Priority;
  status: Status;
};

type DragTaskPayload = {
  id: string;
  source: { index: number; droppable: number };
  destination: { index: number; droppable?: number };
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    create_project: (state, action: PayloadAction<ProjectPayload>) => {
      const project = {
        ...action.payload,
        id: uuid.v4(),
        tasks: {
          [Status.NextUp]: [],
          [Status.InProgress]: [],
          [Status.Review]: [],
          [Status.Completed]: []
        },
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
    create_task: (state, action: PayloadAction<TaskPayload>) => {
      const task = {
        ...action.payload,
        id: uuid.v4(),
        created_at: new Date().getTime()
      };

      const active = state.projects.find(p => p.id === state.active?.id);

      if (active) {
        active.tasks[action.payload.status as Status].push(task);
        state.active = active;
      }
    },
    sort_tasks: (state, action: PayloadAction<DragTaskPayload>) => {
      const active = state.projects.find(p => p.id === state.active?.id);

      if (active) {
        const tasks = active.tasks[action.payload.source.droppable as Status];
        const [reordered] = tasks.splice(action.payload.source.index, 1);
        tasks.splice(action.payload.destination.index, 0, reordered);

        state.active = active;
      }
    },
    move_tasks: (state, action: PayloadAction<DragTaskPayload>) => {
      const active = state.projects.find(p => p.id === state.active?.id);

      if (active) {
        const tasks = active.tasks;
        const task = tasks[action.payload.source.droppable as Status].find(
          t => t.id === action.payload.id
        );

        if (task) {
          tasks[action.payload.source.droppable as Status] = tasks[
            action.payload.source.droppable as Status
          ].filter(t => t.id !== action.payload.id);
          tasks[action.payload.destination.droppable as Status].splice(
            action.payload.destination.index,
            0,
            task
          );

          task.status = action.payload.destination.droppable as Status;
          state.active = active;
        }
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
  create_task,
  sort_tasks,
  move_tasks
} = projectSlice.actions;
export default projectSlice.reducer;
