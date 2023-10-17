import { createReducer, on } from '@ngrx/store';
import { login, logout, loginFailure, loginSuccess } from 'src/_ngrx/actions/auth/login.actions';
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
    console.log('loginSuccess', user);
    localStorage.setItem(ENV.IK.LOCAL_STORAGE.AUTH_USER, JSON.stringify(user));
    return { ...state, user, loading: false };
  }),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
