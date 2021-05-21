import React from 'react';
import { Album } from '../../login/user.interface';
import { useSelector } from 'react-redux';
import { getUserAlbums } from '../../../store/userSlice';
import '../../styles/MainStyles.scss';
import imageArray from '../../../assets/album-images/images'

function displayAlbum(album: Album, index: number) {
  const image_array: any[] = imageArray;
  return (
    <div className="album-container">
      <img className="album-image" src={image_array[index]}/>
      <p className="album-title">{album.title}</p>
    </div>
  )
}

const UserAlbums: React.FC<{}> = () => {
  const albums: Album[] = useSelector(getUserAlbums)
  return (
  <div className="user-albums">
    <div className="title-container">
      <h6 className="main-page__title">Albums</h6>
    </div>
    <div className="album-content">{albums.map((album: Album, index: number) => displayAlbum(album, index))}</div>
  </div>
  )
}

export default UserAlbums;