export interface ITodoList {
  id: string;
  addedDate: string;
  order: number;
  title: string;
}

export interface ITask {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
}

export interface PostTodoListResponse {
  resultCode: number;
  messages: Array<string>;
  data: {
    item: ITodoList;
  };
}

export interface GetTasksResponse {
  items: Array<ITask>;
  totalCount: number;
  error: string;
}

export interface TaskResponse {
  data: { item: ITask };
  resultCode: number;
  messages: Array<string>;
}

export interface TasksResponse {
  data: Array<ITask>;
  resultCode: number;
  messages: Array<string>;
}

export interface TaskFormData {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
}
