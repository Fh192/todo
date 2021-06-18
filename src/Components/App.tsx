import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import './App.css';
import LoginContainer from './Login/LoginContainer';
import TodoLists from './TodoLists/TodoLists';
import Sidebar from './Sidebar/Sidebar';
import CreateTodoList from './CreateTodoList/CreateTodoList';
import { getTodoLists } from '../store/reducers/todoReducer';

interface MapStateProps {
  isAuthorize: boolean;
}

interface MapDispatchProps {
  getTodoLists: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const App: React.FC<Props> = ({ isAuthorize, getTodoLists }) => {
  useEffect(() => getTodoLists(), []);

  return (
    <div className='App'>
      {!isAuthorize ? (
        <LoginContainer />
      ) : (
        <>
          <Sidebar />
          <Route path='/' component={() => <TodoLists />} />
          <Route path='/create-todo' component={() => <CreateTodoList />} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  isAuthorize: state.auth.isAuthorize,
});

export default connect(mapStateToProps, { getTodoLists })(App);
