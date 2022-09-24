import { ITask } from "src/types/task";

export interface IProject {
  id: string;
  name: string;
  description: string;
  tasks: ITask[];
  created_at: number; // timestamp
}
