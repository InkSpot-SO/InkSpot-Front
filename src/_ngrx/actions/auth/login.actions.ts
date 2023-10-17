import { createAction, props } from '@ngrx/store';
import { IK_UserAuth, IK_UserAuthRequest } from 'src/_ngrx/models/user/user-auth.model';

export const login = createAction('[Auth] Login', props<{ user: IK_UserAuthRequest }>());
export const logout = createAction('[Auth] Logout');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: IK_UserAuth }>());
export const loginRefreshToken = createAction('[Auth] Login Refresh Token', props<{ user: IK_UserAuth }>());
