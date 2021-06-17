import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import './App.css';
import LoginContainer from './Login/LoginContainer';
import TodoListContainer from './TodoList/TodoListContainer';
 

interface MapStateProps {
  isAuthorize: boolean;
}

type Props = MapStateProps;

const App: React.FC<Props> = ({ isAuthorize }) => {
  return (
    <div className='App'>
      {!isAuthorize ? (
        <LoginContainer />
      ) : (
        <>
          
          <TodoListContainer />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  isAuthorize: state.auth.isAuthorize,
});

export default connect(mapStateToProps, {})(App);
