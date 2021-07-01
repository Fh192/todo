import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import css from './App.module.css';
import LoginContainer from './Login/LoginContainer';
import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import { getTodoLists } from '../store/reducers/todoReducer';
import { ITodoList } from '../types/todoTypes';

interface MapStateProps {
  isAuthorize: boolean;
  todoLists: Array<ITodoList>;
}

interface MapDispatchProps {
  getTodoLists: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const App: React.FC<Props> = ({ isAuthorize, getTodoLists, todoLists }) => {
  useEffect(() => getTodoLists(), []);

  return (
    <div className={css.App}>
      {!isAuthorize ? (
        <LoginContainer />
      ) : (
        <>
          <Header />
          <Switch>
            {todoLists.length !== 0 && (
              <Redirect from='/todo' exact to={`/todo/${todoLists[0].id}`} />
            )}

            <Route path='/todo/:todoListId' component={() => <TodoList />} />
          </Switch>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  isAuthorize: state.auth.isAuthorize,
  todoLists: state.todo.todoLists,
});

export default connect(mapStateToProps, { getTodoLists })(App);
