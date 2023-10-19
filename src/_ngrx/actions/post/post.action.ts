import { createAction, props } from '@ngrx/store';
import { IK_Post } from 'src/_ngrx/models/post/post.model';

export const postLike = createAction('[Post] Like', props<{ post: IK_Post }>());
export const postDislike = createAction('[Post] Dislike', props<{ post : IK_Post }>());

export const postLikeSuccess = createAction('[Post] Like Success', props<{ post: IK_Post }>());
export const postLikeFailure = createAction('[Post] Like Failure', props<{ post: IK_Post }>());

export const postDislikeSuccess = createAction('[Post] Dislike Success', props<{ post: IK_Post }>());
export const postDislikeFailure = createAction('[Post] Dislike Failure', props<{ post: IK_Post }>());
