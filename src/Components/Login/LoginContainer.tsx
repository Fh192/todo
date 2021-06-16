import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Login from './Login';
import { RootState } from '../../store/store';
import { getAuthData, login } from '../../store/reducers/authReducer';
import { LoginFormData } from '../../types/authTypes';

interface MapStateProps {
  captchaURL: string;
  error: string;
}
interface MapDispatchProps {
  getAuthData: () => void;
  login: (loginData: LoginFormData) => void;
}

type Props = MapStateProps & MapDispatchProps;

const LoginContainer: React.FC<Props> = props => {
  useEffect(() => props.getAuthData(), []);
  return (
    <Login
      login={props.login}
      captchaURL={props.captchaURL}
      error={props.error}
    />
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  captchaURL: state.auth.captchaURL,
  error: state.auth.error,
});

export default connect(mapStateToProps, { getAuthData, login })(LoginContainer);
