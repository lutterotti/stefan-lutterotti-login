import { User } from '../features/login/user.interface';
import userReducer, { LoginState, UserContentState, logOutUser, updateLoginStatus, updateUserContentState } from '../store/userSlice';
import mockPosts from './posts.json';
import mockAlbums from './albums.json';

describe('user reducer', () => {
  const initialState = {
    user: {} as User,
    loading: false,
    posts: [],
    albums: [],
    login_status: LoginState.PENDING,
    content_state: UserContentState.POSTS
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should return a list of posts', () => {
    const updated_store = {...initialState, posts: mockPosts};

    const actual = userReducer(updated_store, {type: 'unknown'});
    expect(actual.posts).toEqual(mockPosts);
  });

  it('should return a list of albums', () => {
    const updated_store = {...initialState, albums: mockAlbums};

    const actual = userReducer(updated_store, {type: 'unknown'});
    expect(actual.albums).toEqual(mockAlbums);
  });

  it('logs out the user', () => {
    const updated_store = {...initialState, user: {} as User};
    const actual = userReducer(updated_store, logOutUser());
    expect(actual.user).toEqual({} as User);
  });

  it('updates the login status', () => {
    const actual = userReducer(initialState, updateLoginStatus(LoginState.PENDING));
    expect(actual.login_status).toEqual(LoginState.PENDING);
  });

  it('updates user content display state', () => {
    const actual = userReducer(initialState, updateUserContentState(UserContentState.ALBUMS));
    expect(actual.content_state).toEqual(UserContentState.ALBUMS);
  });
});
