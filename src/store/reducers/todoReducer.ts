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
  (todoListId: string, pageSize: number, pageNumber: number): TodoThunk =>
  async dispatch => {
    try {
      const data = await todo.getTodoListTasks(
        todoListId,
        pageSize,
        pageNumber
      );

      const task = data.Items;

      dispatch(actions.setTodoListTask(task));
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

export default todoReducer;
