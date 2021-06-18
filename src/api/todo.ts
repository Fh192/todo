import {
  TaskResponse,
  TasksResponse,
  PostTodoListResponse,
  TaskFormData,
  GetTasksResponse,
  ITodoList,
} from '../types/todoTypes';
import instance from './instance';

const todo = {
  getTodoLists: async () => {
    const response = await instance.get<Array<ITodoList>>('todo-lists');

    return response.data;
  },

  getTodoListTasks: async (
    todoListId: string,
    pageSize: number = 10,
    pageNumber: number = 1
  ) => {
    const response = await instance.get<GetTasksResponse>(
      `/todo-lists/${todoListId}/tasks?count=${pageSize}&page=${pageNumber}`
    );
    return response.data;
  },

  createNewTodoList: async (title: string) => {
    const response = await instance.post<PostTodoListResponse>('todo-lists', {
      title,
    });

    return response.data;
  },

  createNewTask: async (todoListId: string, title: string) => {
    const response = await instance.post<TaskResponse>(
      `todo-lists/${todoListId}/tasks`,
      { title }
    );

    return response.data;
  },

  updateTodoListTitle: async (todoListId: string, title: string) => {
    await instance.put(`todo-lists/${todoListId}`, { title });
  },

  reorderTodoList: async (todoListId: string, putAfterItemId: string) => {
    await instance.put(`todo-lists/${todoListId}/reorder`, { putAfterItemId });
  },

  updateTask: async (
    todoListId: string,
    taskId: string,
    taskFormData: TaskFormData
  ) => {
    const response = await instance.put<TasksResponse>(
      `todo-lists/${todoListId}/tasks/${taskId}`,
      { ...taskFormData }
    );

    return response.data;
  },

  reorderTask: async (
    todoListId: string,
    taskId: string,
    putAfterItemId: string
  ) => {
    await instance.put(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, {
      putAfterItemId,
    });
  },

  deleteTodoList: async (todoListId: string) => {
    await instance.delete(`todo-lists/${todoListId}`);
  },

  deleteTask: async (todoListId: string, taskId: string) => {
    await instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
};

export default todo;
