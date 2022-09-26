export interface ITask {
  id: string;
  title: string;
  description: string;
  status: "next-up" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
}
