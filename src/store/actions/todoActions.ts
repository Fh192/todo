import { ITask, ITodoList } from '../../types/todoTypes';

const SET_TODO_LISTS = 'actions/todoActions/SET_TODO_LISTS';
const SET_TODO_LIST_TASKS = 'actions/todoActions/SET_TODO_LIST_TASKS';
const ADD_NEW_TODO_LIST = 'actions/todoActions/ADD_NEW_TODO_LIST';
const ADD_NEW_TASK = 'actions/todoActions/ADD_NEW_TASK';

export const setTodoLists = (todoLists: Array<ITodoList>) =>
  ({ type: SET_TODO_LISTS, payload: todoLists } as const);

export const setTodoListTasks = (tasks: Array<ITask>) =>
  ({
    type: SET_TODO_LIST_TASKS,
    payload: tasks,
  } as const);

export const addNewTodoList = (todoList: ITodoList) =>
  ({ type: ADD_NEW_TODO_LIST, payload: todoList } as const);

export const addNewTask = (task: ITask) =>
  ({ type: ADD_NEW_TASK, payload: task } as const);
