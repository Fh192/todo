import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import css from './App.module.css';
import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import { getTodoLists } from '../store/reducers/todoReducer';
import Login from './Login/Login';
import Preloader from './Preloader/Preloader';
import { getAuthData } from '../store/reducers/authReducer';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const isAuthorize = useSelector((s: RootState) => s.auth.isAuthorize);
  const todoLists = useSelector((s: RootState) => s.todo.todoLists);
  const todoListsFetching = useSelector(
    (s: RootState) => s.todo.todoListsFetching
  );
  const authFetching = useSelector((s: RootState) => s.auth.authFetching);

  useEffect(() => {
    dispatch(getAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorize) {
      dispatch(getTodoLists());
    }
  }, [isAuthorize, dispatch]);

  return (
    <div className={css.App}>
      {authFetching ? (
        <div className={css.preloader}>
          <Preloader size='50px' />
        </div>
      ) : (
        <>
          {!isAuthorize ? (
            <Login />
          ) : (
            <>
              {todoListsFetching ? (
                <div className={css.preloader}>
                  <Preloader size='50px' />
                </div>
              ) : (
                <>
                  <Header />
                  <Switch>
                    <Route exact path='/todo'>
                      {todoLists.length > 0 && (
                        <Redirect to={`/todo/${todoLists[0].id}`} />
                      )}
                    </Route>

                    <Route path='/todo/:todoListId' component={TodoList} />
                  </Switch>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
