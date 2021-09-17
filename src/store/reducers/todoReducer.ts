import { createReducer } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Action, RootState } from '../store';
import todo from '../../api/todo';
import * as actions from '../actions/todoActions';
import { ITask, ITodoList, TaskFormData } from '../../types/todoTypes';

type TodoAction = ReturnType<Action<typeof actions>>;
type TodoThunk = ThunkAction<Promise<void>, RootState, unknown, TodoAction>;

interface TodoState {
  todoLists: Array<ITodoList>;
  tasks: Array<ITask>;
  tasksCount: number;
}

const initialState: TodoState = {
  todoLists: [],
  tasks: [],
  tasksCount: 0,
};

const todoReducer = createReducer(initialState, b => {
  b.addCase(actions.setTodoLists, (state, action) => {
    state.todoLists = action.payload.todoLists;
  });

  b.addCase(actions.addNewTodoList, (state, action) => {
    state.todoLists.push(action.payload);
  });

  b.addCase(actions.setTodoListTasks, (state, action) => {
    state.tasks = action.payload.tasks;
    state.tasksCount = action.payload.tasksCount;
  });

  b.addCase(actions.addNewTask, (state, action) => {
    state.tasks.unshift(action.payload);
  });
});

export const getTodoLists = (): TodoThunk => async dispatch => {
  const todoLists = await todo.getTodoLists();
  dispatch(actions.setTodoLists(todoLists));
};

export const getTodoListTasks =
  (todoListId: string, pageSize?: number, pageNumber?: number): TodoThunk =>
  async dispatch => {
    const data = await todo.getTodoListTasks(todoListId, pageSize, pageNumber);
    const tasks = data.items;
    const tasksCount = data.totalCount;

    dispatch(actions.setTodoListTasks(tasks, tasksCount));
  };

export const addNewTodoList =
  (title: string): TodoThunk =>
  async dispatch => {
    const data = await todo.createNewTodoList(title);
    const todoList = data.data.item;

    dispatch(actions.addNewTodoList(todoList));
  };

export const deleteTodoList =
  (todoListId: string): TodoThunk =>
  async dispatch => {
    await todo.deleteTodoList(todoListId);
    dispatch(getTodoLists());
  };

export const updateTodoListTitle =
  (todoListId: string, title: string): TodoThunk =>
  async dispatch => {
    await todo.updateTodoListTitle(todoListId, title);
    dispatch(getTodoLists());
  };

export const addNewTask =
  (todoListId: string, title: string): TodoThunk =>
  async dispatch => {
    const data = await todo.createNewTask(todoListId, title);
    const task = data.data.item;

    if (data.resultCode === 0) {
      dispatch(actions.addNewTask(task));
      dispatch(getTodoListTasks(todoListId));
    }
  };

export const updateTask =
  (todoListId: string, taskId: string, taskFormData: TaskFormData): TodoThunk =>
  async dispatch => {
    await todo.updateTask(todoListId, taskId, taskFormData);
    dispatch(getTodoListTasks(todoListId));
  };

export const reorderTask =
  (todoListId: string, taskId: string, putAfterItemId: string): TodoThunk =>
  async dispatch => {
    await todo.reorderTask(todoListId, taskId, putAfterItemId);
    dispatch(getTodoListTasks(todoListId));
  };

export const deleteTask =
  (todoListId: string, taskId: string): TodoThunk =>
  async dispatch => {
    await todo.deleteTask(todoListId, taskId);
    dispatch(getTodoListTasks(todoListId));
  };

export default todoReducer;
