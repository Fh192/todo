import { createAction } from '@reduxjs/toolkit';
import { ITask, ITodoList } from '../../types/todoTypes';

export const setTodoLists = createAction(
  'todoActions/SET_TODO_LISTS',
  (todoLists: Array<ITodoList>) => ({ payload: { todoLists } })
);

export const setTodoListTasks = createAction(
  'todoActions/SET_TODO_LIST_TASKS',
  (tasks: Array<ITask>, tasksCount: number) => ({
    payload: { tasks, tasksCount },
  })
);

export const addNewTodoList = createAction<ITodoList>(
  'todoActions/ADD_NEW_TODO_LIST'
);

export const addNewTask = createAction<ITask>('todoActions/ADD_NEW_TASK');
