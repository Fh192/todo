import { createAction } from '@reduxjs/toolkit';
import { ITask, ITodoList } from '../../types/todoTypes';

export const setTodoLists = createAction(
  'todoActions/SET_TODO_LISTS',
  (todoLists: Array<ITodoList>) => ({ payload: { todoLists } })
);

export const removeTodoList = createAction<string>(
  'todoActions/REMOVE_TODO_LIST'
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

export const toggleTasksFetching = createAction<boolean>(
  'todoActions/TOGGLE_TASKS_FETCHING'
);

export const toggleTodoListsFetching = createAction<boolean>(
  'todoActions/TOGGLE_TODO_LISTS_FETCHING'
);

export const addNewTask = createAction<ITask>('todoActions/ADD_NEW_TASK');

export const removeTask = createAction<string>('todoActions/REMOVE_TASK');
