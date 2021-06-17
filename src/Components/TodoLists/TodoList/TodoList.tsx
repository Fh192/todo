import React from 'react';
import css from './TodoList.module.css';

interface Props {
  id: string;
  addedDate: string;
  order: number | null;
  title: string;

  deleteTodoList: (todoListId: string) => void;
}

const TodoList: React.FC<Props> = props => {
  const date = props.addedDate.split('T');

  const [year, month, day] = date[0].split('-');
  const [hour, minute] = date[1].split(':');

  return (
    <div className={css.todoList}>
      <header className={css.header}>
        <div className={css.title}>{props.title}</div>
        <div className={css.addedDate}>
          <div>{`${day}.${month}.${year}`}</div>
          <div>{`${hour}:${minute}`}</div>
        </div>
        <div
          className={css.deleteTodoList}
          onClick={() => props.deleteTodoList(props.id)}
        >
          <button>Delete Todo</button>
        </div>
      </header>
    </div>
  );
};

export default TodoList;
