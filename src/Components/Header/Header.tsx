import React, { useState } from 'react';
import css from './Header.module.css';
import { Formik, Form, Field } from 'formik';
import CreateIcon from '../SVG/CreateIcon';
import DeleteIcon from '../SVG/DeleteIcon';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { connect } from 'react-redux';
import { ITodoList } from '../../types/todoTypes';
import {
  addNewTodoList,
  deleteTodoList,
} from '../../store/reducers/todoReducer';
import { logout } from '../../store/reducers/authReducer';
import LogoutIcon from '../SVG/LogoutIcon';

interface MapStateProps {
  todoLists: Array<ITodoList>;
}

interface MapDispatchProps {
  addNewTodoList: (title: string) => Promise<void>;
  deleteTodoList: (todoListId: string) => Promise<void>;
  logout: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const Header: React.FC<Props> = ({
  todoLists,
  addNewTodoList,
  deleteTodoList,
  logout,
}) => {
  const [createTodoMode, setCreateTodoMode] = useState(false);

  return (
    <header className={css.header}>
      <div>
        <div className={css.allTodoLists}>
          <div className={css.title}>
            <span>All todo lists</span>
            <span>{`${todoLists.length} of 10`}</span>
          </div>
          <ul className={css.list}>
            {todoLists
              .sort((a, b) => (a.order < b.order ? -1 : 1))
              .map(todoList => {
                return (
                  <li className={css.todo} key={todoList.id}>
                    <NavLink to={`/todo-list/${todoList.id}`}>
                      <div className={css.todoTitle} title={todoList.title}>
                        {todoList.title}
                      </div>
                    </NavLink>
                    <div
                      className={css.deleteTodo}
                      title={'Delete todo'}
                      onClick={() => deleteTodoList(todoList.id)}
                    >
                      <DeleteIcon size={'13px'} />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={css.createNewTodoList}>
          {createTodoMode ? (
            <Formik
              initialValues={{ title: '' }}
              onSubmit={(values: { title: string }) => {
                addNewTodoList(values.title);
                setCreateTodoMode(false);
              }}
            >
              <Form>
                <Field
                  className={css.formTitle}
                  name='title'
                  placeholder='Todo list title...'
                  autoFocus
                  onBlur={() => setCreateTodoMode(false)}
                />
              </Form>
            </Formik>
          ) : (
            <>
              <button onClick={() => setCreateTodoMode(true)}>
                <CreateIcon size='20px' />
                <span> Create new todo list</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className={css.logout}>
        <button onClick={() => logout()} title='Logout'>
          <LogoutIcon size={'25px'} />
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  todoLists: state.todo.todoLists,
});

export default connect(mapStateToProps, {
  addNewTodoList,
  deleteTodoList,
  logout,
})(Header);
