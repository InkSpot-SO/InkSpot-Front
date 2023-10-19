import { createAction, props } from '@ngrx/store';
import { IK_Post } from 'src/_ngrx/models/post/post.model';

export const postLike = createAction('[Post] Like', props<{ post: IK_Post }>());
export const postDislike = createAction('[Post] Dislike', props<{ post : IK_Post }>());

export const postLikeSuccess = createAction('[Post] Like Success', props<{ post: IK_Post }>());
export const postLikeFailure = createAction('[Post] Like Failure', props<{ post: IK_Post }>());

export const postDislikeSuccess = createAction('[Post] Dislike Success', props<{ post: IK_Post }>());
export const postDislikeFailure = createAction('[Post] Dislike Failure', props<{ post: IK_Post }>());

export const postAddFavorite = createAction('[Post] Add Favorite', props<{ post: IK_Post }>());
export const postRemoveFavorite = createAction('[Post] Remove Favorite', props<{ post: IK_Post }>());

export const postFavoriteSuccess = createAction('[Post] Favorite Success', props<{ post: IK_Post }>());
export const postFavoriteFailure = createAction('[Post] Favorite Failure', props<{ post: IK_Post }>());


export const postRemoveFavoriteSuccess = createAction('[Post] Remove Favorite Success', props<{ post: IK_Post }>());
