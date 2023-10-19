import { createReducer, on } from '@ngrx/store';
import { login, logout, loginFailure, loginSuccess, userAddLike, userRemoveLike, userAddFavorite, userRemoveFavorite } from 'src/_ngrx/actions/auth/login.actions';
import { IK_UserAuth } from 'src/_ngrx/models/user/user-auth.model';
import { AuthUserState } from 'src/_ngrx/states/auth/auth-user.state';
import { ENV } from 'src/environnement';
const getSavedUser = () => {
  const localStorageValue = localStorage.getItem(ENV.IK.LOCAL_STORAGE.AUTH_USER);
  return localStorageValue ? JSON.parse(localStorageValue) as IK_UserAuth : null;
}
export const initialState: AuthUserState  = {
  user: getSavedUser(),
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    return { ...state, loading: true };
  }),
  on(logout, state => {
    localStorage.removeItem(ENV.IK.LOCAL_STORAGE.AUTH_USER);
    return { ...state, user: null };
  }),
  on(loginSuccess, (state, { user }) => {
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user, loading: false };
  }),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(userAddLike, (state, { post }) => {
    const user = {
      ...state.user!,
      likedPosts : [...state.user!.likedPosts, post]
      }
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),

  on(userRemoveLike, (state, { postId }) => {
    const user = {
      ...state.user!,
      likedPosts : state.user!.likedPosts.filter((post) => post.id !== postId)
      }

    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }
  ),

  on(userAddFavorite, (state, { post }) => {
    const user = {
      ...state.user!,
      favoritesPosts : [...state.user!.favoritesPosts, post]
      }
      console.log('userAddFavorite store', user , post);
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),
  on(userRemoveFavorite, (state, { post }) => {
    const user = {
      ...state.user!,
      favoritesPosts : state.user!.favoritesPosts.filter((favoritePost) => favoritePost.id !== post.id)
      }
      console.log('userRemoveFavorite store', user , post);

    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  })
)
