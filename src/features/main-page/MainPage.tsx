
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserContentState, UserContentState } from '../../store/userSlice';
import '../styles/MainStyles.scss';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
import UserAlbums from './user-content/UserAlbums';
import UserPosts from './user-content/UserPosts';
import UserCard from './UserCard';

function displayUserContent(current_content: UserContentState) {
  if (UserContentState.ALBUMS === current_content) {
    return (<UserAlbums></UserAlbums>);
  } else {
    return (<UserPosts></UserPosts>);
  }
}

const MainPage: React.FC<{}> = () => {
  const current_state = useSelector(getUserContentState);
  return (
    <div className="main-page">
      <Navigation></Navigation>
      <div className="main-page__content">
        <div className="side-content">
          <UserCard></UserCard>
          <Dashboard></Dashboard>
        </div>
        <div className="user-content">
          {displayUserContent(current_state)}
        </div>
      </div>
    </div>
  )
};

export default MainPage;
