import { ThunkAction } from 'redux-thunk';
import { Action, RootState } from '../store';
import todo from '../../api/todo';
import * as actions from '../actions/todoActions';
import { Task, TodoList } from '../../types/todoTypes';

type TodoAction = ReturnType<Action<typeof actions>>;
type TodoThunk = ThunkAction<Promise<void>, RootState, unknown, TodoAction>;

interface TodoState {
  todoLists: Array<TodoList>;
  tasks: Array<Task>;
}

const initialState: TodoState = {
  todoLists: [
    {
      id: '',
      title: '',
      addedDate: '',
      order: null,
    },
  ],
  tasks: [
    {
      description: '',
      title: '',
      completed: false,
      status: null,
      priority: null,
      startDate: '',
      deadline: '',
      id: '',
      todoListId: '',
      order: null,
      addedDate: '',
    },
  ],
};

const todoReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'actions/todoActions/SET_TODO_LISTS':
      return { ...state, todoLists: action.payload };

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
    } catch (e) {}
  };

export default todoReducer;
