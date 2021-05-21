import React from 'react';
import './features/styles/MainStyles.scss';
import UserLogin from './features/login/UserLogin';
import { useAppSelector } from './store/hooks';
import { userIsLoggedIn } from './store/userSlice';
import MainPage from './features/main-page/MainPage';

function displayCurrentPage(user_is_logged_in: boolean) {
  if (user_is_logged_in) {
    return (<MainPage></MainPage>);
  } else {
    return (<UserLogin></UserLogin>);
  }
}

const App: React.FC<{}> = () => {
  const user_is_logged_in: boolean = useAppSelector(userIsLoggedIn);
  return (<div className="platform">{displayCurrentPage(user_is_logged_in)}</div>)
}

export default App;
