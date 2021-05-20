import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/userSlice';
import { User } from '../login/user.interface';
import profileImage from '../../assets/profile-pictures/profile.jpg';
import '../styles/MainStyles.scss';

const UserCard: React.FC<{}> = () => {
  const user_info: User = useSelector(getUser);
  return (
    <div className="user-card">
      <img src={profileImage} className="user-image"/>
      <p className="user-name">{user_info.name}</p>
      <p className="user-slogan">{user_info.company.catchPhrase}</p>
    </div>
  )
}

export default UserCard;