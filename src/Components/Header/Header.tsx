import React, { useEffect, useRef, useState } from 'react';
import css from './Header.module.css';
import CreateIcon from '../SVG/CreateIcon';
import DeleteIcon from '../SVG/DeleteIcon';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { ITodoList } from '../../types/todoTypes';
import {
  addNewTodoList,
  deleteTodoList,
  reorderTodoList,
} from '../../store/reducers/todoReducer';
import { logout } from '../../store/reducers/authReducer';
import LogoutIcon from '../SVG/LogoutIcon';
import UserIcon from '../SVG/UserIcon';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Header: React.FC = props => {
  const dispatch = useDispatch();

  const headerRef = useRef<HTMLElement>(null);
  const username = useSelector((s: RootState) => s.auth.login);
  const todoLists = useSelector((s: RootState) => s.todo.todoLists);
  const [todoTile, setTodoTitle] = useState('');
  const [spinIcon, setSpinIcon] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodoList | null>(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [headerAbsolute, setHeaderAbsolute] = useState(innerWidth <= 500);

  const onTodoCreate = () => {
    if (todoTile) {
      const title = todoTile.replace(todoTile[0], todoTile[0].toUpperCase());
      const delay = setTimeout(() => {
        setSpinIcon(false);
        clearTimeout(delay);
      }, 1000);

      dispatch(addNewTodoList(title));
      setTodoTitle('');
      setSpinIcon(true);
    }
  };

  const onTodoRemove = (todoId: string) => {
    dispatch(deleteTodoList(todoId));
  };

  const dragStartHandler = (todoList: ITodoList) => {
    setSelectedTodo(todoList);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '#fff';
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    todoList: ITodoList
  ) => {
    e.preventDefault();
    e.currentTarget.style.background = '#fff';
    if (selectedTodo) {
      dispatch(reorderTodoList(selectedTodo.id, todoList.id));
    }
  };

  useEffect(() => {
    const listener = () => {
      setInnerWidth(window.innerWidth);
      if (window.innerWidth <= 500) {
        setHeaderAbsolute(true);
      } else {
        setHeaderAbsolute(false);
      }
    };

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  useOnClickOutside(headerRef, () => {
    if (innerWidth <= 500) {
      setHeaderAbsolute(true);
    }
  });

  return (
    <>
      <header
        className={css.header}
        style={{ position: headerAbsolute ? 'absolute' : 'unset' }}
        ref={headerRef}
      >
        <div className={css.top}>
          <div className={css.title}>
            <span>Your todos</span>
            <span>{`${todoLists.length} of 10`}</span>
          </div>
          <div
            className={`${css.createTodo} ${
              todoLists.length === 10 && css.cursorNoDrop
            }`}
          >
            <div
              className={`${css.createIcon} ${spinIcon && css.spinCreateIcon} ${
                todoLists.length === 10 && css.cursorNoDrop
              }`}
              onClick={onTodoCreate}
            >
              <CreateIcon size='20px' />
            </div>
            <input
              className={`${todoLists.length === 10 && css.cursorNoDrop}`}
              type='text'
              placeholder='Add todo'
              value={todoTile}
              onChange={e => setTodoTitle(e.currentTarget.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') onTodoCreate();
              }}
              disabled={todoLists.length === 10}
              title={`${
                todoLists.length === 10 ? 'Max todo lists count is 10' : ''
              }`}
            />
          </div>
          <div className={css.todoLists}>
            {todoLists.map(todo => (
              <div
                className={css.todo}
                draggable={true}
                onDragStart={() => {
                  dragStartHandler(todo);
                }}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDrop={e => {
                  dropHandler(e, todo);
                }}
                key={todo.id}
              >
                <div className={css.todoTitle}>
                  <NavLink to={`/${todo.id}`} activeClassName={css.activeTodo}>
                    {todo.title}
                  </NavLink>
                </div>
                <div
                  className={css.removeTodo}
                  onClick={() => onTodoRemove(todo.id)}
                  title='Remove todo list'
                >
                  <DeleteIcon size='17px' />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={css.bottom}>
          <div className={css.user}>
            <UserIcon size='30px' />
            <span>{username}</span>
          </div>
          <div
            className={css.logout}
            onClick={() => {
              dispatch(logout());
            }}
            title='Logout'
          >
            <div className={css.logoutIcon}>
              <LogoutIcon size='25px' />
            </div>
          </div>
        </div>
      </header>
      {innerWidth <= 500 && (
        <div
          className={css.openHeader}
          onClick={() => {
            if (headerAbsolute) {
              setHeaderAbsolute(false);
            } else {
              setHeaderAbsolute(true);
            }
          }}
          title='Show todo lists'
        ></div>
      )}
    </>
  );
};

export default Header;
