import { createAction, props } from '@ngrx/store';
import { IK_Comment, IK_Post } from 'src/_ngrx/models/post/post.model';
import { IK_UserAuth, IK_UserAuthRequest } from 'src/_ngrx/models/user/user-auth.model';

export const login = createAction('[Auth] Login', props<{ user: IK_UserAuthRequest }>());
export const logout = createAction('[Auth] Logout');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: IK_UserAuth }>());
export const loginRefreshToken = createAction('[Auth] Login Refresh Token', props<{ user: IK_UserAuth }>());


export const userRemoveLike = createAction('[User] Remove Like', props<{ postId: number }>());
export const userAddLike = createAction('[User] Add Like', props<{ post : IK_Post }>());

export const userAddFavorite = createAction('[User] Add Favorite', props<{ post: IK_Post }>());
export const userRemoveFavorite = createAction('[User] Remove Favorite', props<{ post: IK_Post }>());

export const userRemovePost = createAction('[User] Remove Post', props<{ post: IK_Post }>());
export const userAddPost = createAction('[User] Add Post', props<{ post: IK_Post }>());

export const userAddComment = createAction('[User] Add Comment', props<{ comment : IK_Comment , postId : number }>());
export const userRemoveComment = createAction('[User] Remove Comment', props<{ commentId : number , postId : number }>());

export const userAddSubComment = createAction('[User] Add Sub Comment', props<{ subComment : IK_Comment , parentComments : IK_Comment, postId : number }>());
export const userRemoveSubComment = createAction('[User] Remove Sub Comment', props<{ subCommentId : number , parentComments : number , postId : number }>());


export const userInfosChange = createAction('[User] Infos Change', props<{ user: IK_UserAuth }>());
