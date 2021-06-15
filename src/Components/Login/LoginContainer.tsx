import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Login from './Login';
import { RootState } from '../../store/store';
import { getAuthData } from '../../store/reducers/authReducer';

interface MapStateProps {}
interface MapDispatchProps {
  getAuthData: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const LoginContainer: React.FC<Props> = props => {
  useEffect(() => props.getAuthData(), []);
  return <Login />;
};

const mapStateToProps = (state: RootState): MapStateProps => ({});

export default connect(mapStateToProps, { getAuthData })(LoginContainer);
