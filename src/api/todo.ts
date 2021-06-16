import {
  TaskResponse,
  PostTodoListResponse,
  TaskData,
  TasksPortionResponse,
  TodoList,
} from '../types/todoTypes';
import instance from './instance';

const todo = {
  getTodoList: async () => {
    const response = await instance.get<TodoList>('todo-lists');

    return response.data;
  },

  getTasksPortion: async (
    todoListId: string,
    pageSize: number,
    pageNumber: number
  ) => {
    const response = await instance.get<TasksPortionResponse>(
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
    taskData: TaskData
  ) => {
    const response = await instance.put<TaskResponse>(
      `todo-lists/${todoListId}/tasks/${taskId}`,
      { ...taskData }
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
