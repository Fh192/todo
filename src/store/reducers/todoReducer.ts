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

const todoReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'actions/todoActions/SET_TODO_LISTS':
      return { ...state, todoLists: action.payload };

    case 'actions/todoActions/ADD_NEW_TODO_LIST':
      return {
        ...state,
        todoLists: [action.payload, ...state.todoLists],
      };

    case 'actions/todoActions/SET_TODO_LIST_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        tasksCount: action.payload.tasksCount,
      };

    case 'actions/todoActions/ADD_NEW_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    default:
      return state;
  }
};

export const getTodoLists = (): TodoThunk => async dispatch => {
  try {
    const todoLists = await todo.getTodoLists();

    dispatch(actions.setTodoLists(todoLists));
  } catch (e) {
    console.log(e.messages);
  }
};

export const getTodoListTasks =
  (todoListId: string, pageSize?: number, pageNumber?: number): TodoThunk =>
  async dispatch => {
    try {
      const data = await todo.getTodoListTasks(
        todoListId,
        pageSize,
        pageNumber
      );

      const tasks = data.items;
      const tasksCount = data.totalCount;

      dispatch(actions.setTodoListTasks(tasks, tasksCount));
    } catch (e) {
      console.log(e.message);
    }
  };

export const addNewTodoList =
  (title: string): TodoThunk =>
  async dispatch => {
    try {
      const data = await todo.createNewTodoList(title);

      const todoList = data.data.item;

      dispatch(actions.addNewTodoList(todoList));
    } catch (e) {
      console.log(e.message);
    }
  };

export const deleteTodoList =
  (todoListId: string): TodoThunk =>
  async dispatch => {
    try {
      await todo.deleteTodoList(todoListId);
      dispatch(getTodoLists());
    } catch (e) {
      console.log(e.message);
    }
  };

export const updateTodoListTitle =
  (todoListId: string, title: string): TodoThunk =>
  async dispatch => {
    try {
      await todo.updateTodoListTitle(todoListId, title);
      dispatch(getTodoLists());
    } catch (e) {
      console.log(e.message);
    }
  };

export const addNewTask =
  (todoListId: string, title: string): TodoThunk =>
  async dispatch => {
    try {
      const data = await todo.createNewTask(todoListId, title);
      const task = data.data.item;

      if (data.resultCode === 0) {
        dispatch(actions.addNewTask(task));
        dispatch(getTodoListTasks(todoListId));
      } else {
        throw new Error(data.messages[0]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const updateTask =
  (todoListId: string, taskId: string, taskFormData: TaskFormData): TodoThunk =>
  async dispatch => {
    try {
      await todo.updateTask(todoListId, taskId, taskFormData);
      dispatch(getTodoListTasks(todoListId));
    } catch (e) {
      console.log(e);
    }
  };

export const reorderTask =
  (todoListId: string, taskId: string, putAfterItemId: string): TodoThunk =>
  async dispatch => {
    try {
      await todo.reorderTask(todoListId, taskId, putAfterItemId);

      dispatch(getTodoListTasks(todoListId));
    } catch (e) {
      console.log(e);
    }
  };

export const deleteTask =
  (todoListId: string, taskId: string): TodoThunk =>
  async dispatch => {
    await todo.deleteTask(todoListId, taskId);

    dispatch(getTodoListTasks(todoListId));
  };

export default todoReducer;
