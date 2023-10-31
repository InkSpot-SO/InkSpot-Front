import { createReducer, on } from '@ngrx/store';
import { login, logout, loginFailure, loginSuccess, userAddLike, userRemoveLike, userAddFavorite, userRemoveFavorite, userAddPost, userRemovePost, userAddComment, userAddSubComment } from 'src/_ngrx/actions/auth/login.actions';
import { IK_Comment } from 'src/_ngrx/models/post/post.model';
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
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),
  on(userAddPost, (state, { post }) => {
    const user : IK_UserAuth = {
      ...state.user!,
      createdPosts : [...state.user!.createdPosts, post]
      }
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),
  on(userRemovePost, (state, { post }) => {
    const user : IK_UserAuth = {
      ...state.user!,
      createdPosts : state.user!.createdPosts.filter((userPost) => userPost.id !== post.id)
      }

    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),

  on(userAddComment, (state, { comment }) => {
    comment.isUserOwner = true;
    const user : IK_UserAuth = {
      ...state.user!,
      postComments : [...state.user!.postComments, comment]
      }
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),

  on(userAddSubComment , (state, { subComment }) => {
    subComment.isUserOwner = true;
    const pc = state.user!.postComments = [
      ...state.user!.postComments,
      subComment
    ]
    const user : IK_UserAuth = {
      ...state.user!,
      postComments : pc
      }
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user };
  }),





)


