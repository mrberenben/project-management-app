export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}

export enum Type {
  Epic = 1,
  Story = 2,
  Task = 3,
  Bug = 4
}

export enum Status {
  NextUp = 1,
  InProgress = 2,
  Review = 3,
  Completed = 4
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  type: Type;
  status: Status;
  priority: Priority;
}
