export interface TodoList {
  id: string;
  addedDate: string;
  order: number | null;
  title: string;
}

export interface PostTodoListResponse {
  resultCode: number;
  messages: Array<string>;
  data: {
    item: {
      id: string;
      title: string;
      addedDate: string;
      order: number;
    };
  };
}

export interface Task {
  description: string;
  title: string;
  completed: boolean;
  status: number | null;
  priority: number | null;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number | null;
  addedDate: string;
}

export interface TasksPortionResponse {
  items: Array<Task>;
  Items: Task;
  totalCount: number;
  error: string;
}

export interface TaskResponse {
  data: Task;
  resultCode: number;
  messages: Array<string>;
}

export interface TaskData {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
}
