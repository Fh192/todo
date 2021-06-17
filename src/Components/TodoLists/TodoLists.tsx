import React from 'react';
import css from './TodoLists.module.css';
import TodoList from './TodoList/TodoList';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { ITodoList } from '../../types/todoTypes';
import {
  deleteTodoList,
  updateTodoListTitle,
  addNewTask,
  getTodoListTasks,
} from '../../store/reducers/todoReducer';

interface MapStateProps {
  todoLists: Array<ITodoList>;
}

interface MapDispatchProps {
  deleteTodoList: (todoListId: string) => void;
  updateTodoListTitle: (todoListId: string, title: string) => void;
  addNewTask: (todoListId: string, title: string) => void;
  getTodoListTasks: (todoListId: string) => void;
}

type Props = MapStateProps & MapDispatchProps;

const TodoLists: React.FC<Props> = props => {
  return (
    <div className={css.todoLists}>
      {props.todoLists.map(todoList => {
        return (
          <TodoList
            id={todoList.id}
            addedDate={todoList.addedDate}
            order={todoList.order}
            title={todoList.title}
            deleteTodoList={props.deleteTodoList}
            updateTodoListTitle={props.updateTodoListTitle}
            addNewTask={props.addNewTask}
            getTodoListTasks={props.getTodoListTasks}
            key={todoList.id}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  todoLists: state.todo.todoLists,
});

export default connect(mapStateToProps, {
  deleteTodoList,
  updateTodoListTitle,
  addNewTask,
  getTodoListTasks,
})(TodoLists);
