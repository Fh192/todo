import { ThunkAction } from 'redux-thunk';
import { Action, RootState } from '../store';
import todo from '../../api/todo';
import * as actions from '../actions/todoActions';
import { Task, ITodoList } from '../../types/todoTypes';

type TodoAction = ReturnType<Action<typeof actions>>;
type TodoThunk = ThunkAction<Promise<void>, RootState, unknown, TodoAction>;

interface TodoState {
  todoLists: Array<ITodoList>;
  tasks: Array<Task>;
}

const initialState: TodoState = {
  todoLists: [],
  tasks: [],
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

    case 'actions/todoActions/SET_TODO_LIST_TASK':
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
      };

    default:
      return state;
  }
};

export const getTodoLists = (): TodoThunk => async dispatch => {
  try {
    const todoLists = await todo.getTodoLists();

    dispatch(actions.setTodos(todoLists));
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

      dispatch(actions.setTodoListTasks(tasks));
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
      const tasks = data.data;

      if (data.resultCode === 0) {
        dispatch(actions.setTodoListTasks(tasks));
        dispatch(getTodoListTasks(todoListId));
      } else {
        throw new Error(data.messages[0]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export default todoReducer;
