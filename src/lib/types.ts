export type Priority = 0 | 1 | 2 | 3 | 4;
export type Status = 0 | 1 | 2 | 3;

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}
