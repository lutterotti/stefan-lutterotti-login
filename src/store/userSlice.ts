import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Album, Post } from '../features/login/user.interface';
import { RootState } from './store';
import { fetchUser } from './userApi';
import { isEmpty } from 'lodash';
import mockPosts from '../spec/posts.json';
import mockAlbums from '../spec/albums.json';
import mockUser from '../spec/user.json';

export enum LoginState {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed'
}

export enum UserContentState {
  POSTS = 'posts',
  ALBUMS = 'albums'
}

interface RequestRepsonse {
  user: User;
  posts: Post[];
  albums: Album[];
}

export interface userState {
  user: User;
  posts: Post[];
  albums: Album[];
  loading: boolean;
  login_status: LoginState;
  content_state: UserContentState;
}

const initialState: userState = {
  user: {} as User,
  loading: false,
  posts: [],
  albums: [],
  login_status: LoginState.PENDING,
  content_state: UserContentState.POSTS
};

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUser',
  async (login_email: string) => {
    const response: RequestRepsonse = await fetchUser(login_email).toPromise();
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateLoginStatus: (state: userState, action: PayloadAction<LoginState>) => {
      return {...state, login_status: action.payload};
    },
    logOutUser: (state: userState, _action: PayloadAction<void>) => {
      return {...state, user: {} as User};
    },
    updateUserContentState: (state: userState, action: PayloadAction<UserContentState>) => {
      return {...state, content_state: action.payload};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const {user, posts, albums} = action.payload;
        state.loading = false;
        state.user = user ? user : {} as User;
        state.albums = albums;
        state.posts = posts;
        state.login_status = !!user ? LoginState.SUCCESS : LoginState.FAILED;
      });
  },
});

export const { updateLoginStatus, logOutUser, updateUserContentState } = userSlice.actions;

export const userIsLoggedIn = (state: RootState) => !isEmpty(state.user.user);
export const getUser = (state: RootState) => state.user.user;
export const getUserPosts = (state: RootState) => state.user.posts;
export const getUserAlbums = (state: RootState) => state.user.albums;
export const getLoginStatus = (state: RootState) => state.user.login_status;
export const getUserContentState = (state: RootState) => state.user.content_state;
export const isLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
