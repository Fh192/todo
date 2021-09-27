import { createReducer } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Action, RootDispatch, RootState } from '../store';
import todo from '../../api/todo';
import * as actions from '../actions/todoActions';
import { ITask, ITodoList } from '../../types/todoTypes';

type TodoAction = ReturnType<Action<typeof actions>>;
type TodoThunk = ThunkAction<Promise<void>, RootState, unknown, TodoAction>;

interface TodoState {
  todoLists: Array<ITodoList>;
  tasks: Array<ITask>;
  tasksCount: number;
  tasksFetching: boolean;
  taskUpdating: boolean;
  todoListsFetching: boolean;
}

const initialState: TodoState = {
  todoLists: [],
  tasks: [],
  tasksCount: 0,
  tasksFetching: true,
  taskUpdating: false,
  todoListsFetching: true,
};

const todoReducer = createReducer(initialState, b => {
  b.addCase(actions.setTodoLists, (state, action) => {
    state.todoLists = action.payload.todoLists;
  });

  b.addCase(actions.removeTodoList, (state, action) => {
    state.todoLists = state.todoLists.filter(
      todo => todo.id !== action.payload
    );
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

  b.addCase(actions.removeTask, (state, action) => {
    state.tasks = state.tasks.filter(task => task.id !== action.payload);
  });

  b.addCase(actions.toggleTodoListsFetching, (state, action) => {
    state.todoListsFetching = action.payload;
  });

  b.addCase(actions.toggleTasksFetching, (state, action) => {
    state.tasksFetching = action.payload;
  });
});

export const getTodoLists = (): TodoThunk => async dispatch => {
  dispatch(actions.toggleTodoListsFetching(true));

  const todoLists = await todo.getTodoLists();
  dispatch(actions.setTodoLists(todoLists));

  dispatch(actions.toggleTodoListsFetching(false));
};

export const getTodoListTasks =
  (todoListId: string, pageSize?: number, pageNumber?: number): TodoThunk =>
  async dispatch => {
    dispatch(actions.toggleTasksFetching(true));

    const data = await todo.getTodoListTasks(todoListId, pageSize, pageNumber);
    const tasks = data.items.sort((a, b) => a.order - b.order);
    const tasksCount = data.totalCount;

    dispatch(actions.setTodoListTasks(tasks, tasksCount));
    dispatch(actions.toggleTasksFetching(false));
  };

export const addNewTodoList =
  (title: string): TodoThunk =>
  async dispatch => {
    const data = await todo.createNewTodoList(title);
    const todoList = data.data.item;

    dispatch(actions.addNewTodoList(todoList));
  };

export const reorderTodoList =
  (todoListId: string, putAfterItemId: string) =>
  async (dispatch: RootDispatch) => {
    await todo.reorderTodoList(todoListId, putAfterItemId);
    dispatch(getTodoLists());
  };

export const deleteTodoList =
  (todoListId: string): TodoThunk =>
  async dispatch => {
    await todo.deleteTodoList(todoListId);
    dispatch(actions.removeTodoList(todoListId));
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
    dispatch(actions.toggleTasksFetching(true));

    const data = await todo.createNewTask(todoListId, title);
    const task = data.data.item;

    if (data.resultCode === 0) {
      dispatch(actions.addNewTask(task));
      dispatch(getTodoListTasks(todoListId));
    }

    dispatch(actions.toggleTasksFetching(false));
  };

export const updateTask =
  (todoListId: string, taskId: string, taskFormData: ITask): TodoThunk =>
  async dispatch => {
    dispatch(actions.toggleTasksFetching(true));

    await todo.updateTask(todoListId, taskId, taskFormData);
    dispatch(getTodoListTasks(todoListId));

    dispatch(actions.toggleTasksFetching(false));
  };

export const reorderTask =
  (
    todoListId: string,
    taskId: string,
    putAfterItemId: string | null
  ): TodoThunk =>
  async dispatch => {
    dispatch(actions.toggleTasksFetching(true));

    await todo.reorderTask(todoListId, taskId, putAfterItemId);
    dispatch(getTodoListTasks(todoListId));

    dispatch(actions.toggleTasksFetching(false));
  };

export const deleteTask =
  (todoListId: string, taskId: string): TodoThunk =>
  async dispatch => {
    dispatch(actions.toggleTasksFetching(true));

    await todo.deleteTask(todoListId, taskId);
    dispatch(actions.removeTask(taskId));

    dispatch(actions.toggleTasksFetching(false));
  };

export default todoReducer;
