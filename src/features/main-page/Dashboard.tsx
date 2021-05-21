import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getUserContentState, UserContentState, updateUserContentState } from '../../store/userSlice';
import { BiPhotoAlbum, BiDetail } from "react-icons/bi";
import '../styles/MainStyles.scss';

const Dashboard: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const selected_state = useSelector(getUserContentState);

  return (
    <div className="dashboard">
      <h6 className="dashboard-title">Dashboard</h6>
      <div className={selected_state === UserContentState.POSTS ? 'dashboard-step selected-step' : 'dashboard-step'} onClick={() => dispatch(updateUserContentState(UserContentState.POSTS))}>
        <BiDetail color="#212241" size="20"/>
        <p className="title-text">Posts</p>
      </div>
      <div className={selected_state === UserContentState.ALBUMS ? 'dashboard-step selected-step' : 'dashboard-step'} onClick={() => dispatch(updateUserContentState(UserContentState.ALBUMS))}>
        <BiPhotoAlbum color="#212241" size="20"/>
        <p className="title-text">Albums</p>
      </div>
    </div>
  )
}

export default Dashboard;