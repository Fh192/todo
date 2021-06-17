import { Task, TodoList } from '../../types/todoTypes';

const SET_TODO_LISTS = 'actions/todoActions/SET_TODO_LISTS';

const SET_TODO_LIST_TASK = 'actions/todoActions/SET_TODO_LIST_TASK';

export const setTodos = (todoLists: Array<TodoList>) =>
  ({ type: SET_TODO_LISTS, payload: todoLists } as const);

export const setTodoListTask = (task: Task) =>
  ({
    type: SET_TODO_LIST_TASK,
    payload: task,
  } as const);
