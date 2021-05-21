import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logOutUser } from '../../store/userSlice';
import '../styles/MainStyles.scss';

const Navigation: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  return (<div className="navigation-bar"><p className="log-out" onClick={() => dispatch(logOutUser())}>Log out</p></div>)
}

export default Navigation;