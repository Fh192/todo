import { Task, ITodoList } from '../../types/todoTypes';

const SET_TODO_LISTS = 'actions/todoActions/SET_TODO_LISTS';
const SET_TODO_LIST_TASK = 'actions/todoActions/SET_TODO_LIST_TASK';
const ADD_NEW_TODO_LIST = 'actions/todoActions/ADD_NEW_TODO_LIST';

export const setTodos = (todoLists: Array<ITodoList>) =>
  ({ type: SET_TODO_LISTS, payload: todoLists } as const);

export const setTodoListTask = (task: Task) =>
  ({
    type: SET_TODO_LIST_TASK,
    payload: task,
  } as const);

export const addNewTodoList = (todoList: ITodoList) =>
  ({ type: ADD_NEW_TODO_LIST, payload: todoList } as const);
