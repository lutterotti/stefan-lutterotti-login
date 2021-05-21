import React from 'react';
import { useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/userSlice';
import { Post } from '../../login/user.interface';
import '../../styles/MainStyles.scss';

function displayPost(post: Post) {

  return (
    <div className="post-container">
      <p className="post-title">{post.title}</p>
      <p className="post-body">{post.body}</p>
    </div>
  )
}

const UserPosts: React.FC<{}> = () => {
  const posts: Post[] = useSelector(getUserPosts);
  return (
    <div className="user-posts">
      <div className="title-container">
        <h6 className="main-page__title">Posts</h6>
      </div>
        <div className="posts-content">{posts.map((post: Post) => displayPost(post))}</div>
    </div>
    )
}

export default UserPosts;