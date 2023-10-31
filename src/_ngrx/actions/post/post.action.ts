import { createAction, props } from '@ngrx/store';
import { IK_Comment, IK_Post } from 'src/_ngrx/models/post/post.model';

export const postCreate = createAction('[Post] Create', props<{ post: FormData }>());
export const postCreateSuccess = createAction('[Post] Create Success', props<{ post: IK_Post }>());
export const postCreateFailure = createAction('[Post] Create Failure');


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


export const postDelete = createAction('[Post] Delete', props<{ post: IK_Post }>());
export const postDeleteSuccess = createAction('[Post] Delete Success', props<{ post: IK_Post }>());
export const postDeleteFailure = createAction('[Post] Delete Failure', props<{ post: IK_Post }>());

export const postAddComment = createAction('[Post] Add Comment', props<{ post: IK_Post , comment : string }>());
export const postAddCommentSuccess = createAction('[Post] Add Comment Success', props<{ post: IK_Post , comment : IK_Comment }>());
export const postAddCommentFailure = createAction('[Post] Add Comment Failure');


export const postAddSubComment = createAction('[Post] Add Sub Comment', props<{ post: IK_Post , parentComments : IK_Comment , subComment : string }>());
export const postAddSubCommentSuccess = createAction('[Post] Add Sub Comment Success', props<{ post: IK_Post , parentComments : IK_Comment , subComment : IK_Comment }>());
export const postAddSubCommentFailure = createAction('[Post] Add Sub Comment Failure');
