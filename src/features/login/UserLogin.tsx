import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserInfo, getLoginStatus, getUser, isLoading, LoginState, updateLoginStatus } from '../../store/userSlice';
import '../styles/MainStyles.scss';

function loginAttemptFailed() {
  return (<p className="login-error-message">Looks like the email you entered is incorrect, please try again.</p>);
}

const UserLogin: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const login_state = LoginState;
  const login_attempt: LoginState = useAppSelector(getLoginStatus);
  const is_loading: boolean = useAppSelector(isLoading);
  const [user_email, updateEmail] = useState('');

  function loginUser() {
    dispatch(fetchUserInfo(user_email))
  };

  ;
  return (
    <div className={is_loading ? 'user-login user-login--loading' : 'user-login'}>
      <Spinner className={is_loading ? 'spinner--display' : 'spinner--hide'} animation="border" role="status"/>
      <h6 className="user-login__title">Sign In</h6>
      <div className="error-container">{login_attempt === login_state.FAILED ? loginAttemptFailed() : ''}</div>
      <div className="login-fields">
        <input className="login-input" placeholder="email" value={user_email} onChange={(event) => {updateEmail(event.target.value); dispatch(updateLoginStatus(LoginState.PENDING));}}/>
        <input className="login-input" placeholder="password" disabled={true}/>
      </div>
      <div className="login-button" onClick={() => loginUser()} ><p>Sign In</p></div>
    </div>
  )
}

export default UserLogin;