export interface Task {
    id: string;
    name: string;
    description?: string;
    project: string;
    user: string;
    dueDate?: Date;
    completed: boolean;
    date: Date;
  }
  