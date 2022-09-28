import { ITask, Status } from "src/types/task";

export interface IProject {
  id: string;
  name: string;
  description: string;
  avatar: string;
  tasks: {
    [Status.NextUp]: ITask[];
    [Status.InProgress]: ITask[];
    [Status.Review]: ITask[];
    [Status.Completed]: ITask[];
  };
  created_at: number; // timestamp
}
