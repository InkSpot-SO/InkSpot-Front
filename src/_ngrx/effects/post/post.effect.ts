import {Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { switchMap, map, catchError, of } from "rxjs";
import { AppState } from "src/_ngrx/actions/app.state";
import { userAddComment, userAddFavorite, userAddLike, userAddPost, userAddSubComment, userRemoveFavorite, userRemoveLike, userRemovePost } from "src/_ngrx/actions/auth/login.actions";
import { postAddComment, postAddCommentFailure, postAddCommentSuccess, postAddFavorite, postAddSubComment, postAddSubCommentSuccess, postCreate, postCreateFailure, postCreateSuccess, postDelete, postDeleteFailure, postDeleteSuccess, postDislike, postDislikeFailure, postDislikeSuccess, postFavoriteFailure, postFavoriteSuccess, postLike, postLikeFailure, postLikeSuccess, postRemoveFavorite, postRemoveFavoriteSuccess } from "src/_ngrx/actions/post/post.action";
import { CommentService } from "src/app/_services/comment/comment.service";
import { PostService } from "src/app/_services/post/post.service";


@Injectable()
export class PostEffects {
  $likePost = createEffect(
    () => this.actions$.pipe(
      ofType(postLike),
      switchMap(action => {
        return this._postService.likePost(action.post.id).pipe(
          map(() => {
            return postLikeSuccess({ post : action.post });
          }),
          catchError(error => of(postLikeFailure({ post : action.post })))
        );
      })
    )
  );

  $dislikePost = createEffect(
    () => this.actions$.pipe(
      ofType(postDislike),
      switchMap(action => {
        // like / dislike handled by the same route
        return this._postService.likePost(action.post.id).pipe(
          map((r) => {
            return postDislikeSuccess({ post : action.post });
          }),
          catchError(error => of(postDislikeFailure({ post : action.post })))
        );
      })
    )
  );

  $likePostSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postLikeSuccess),
        map(action => {
          return action;
        })
      ),
    { dispatch: false }
  );
  $postDelete = createEffect(
    () => this.actions$.pipe(
      ofType(postDelete),
      switchMap(action => {
        return this._postService.delete(action.post.id).pipe(
          map(() => {
            this.store.dispatch(userRemovePost({ post : action.post }));
            this.message.success('Post deleted');
            return action;
          }),
          catchError(error => of(userRemovePost({ post : action.post })))
        );
      })
    )
  );



  $postLikeFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postLikeFailure),
        map(action => {
          this.message.error('Like failed');
          return action;
        })
      ),
    { dispatch: false }
  )

  $postDislikeFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(postDislikeFailure),
        map(action => {
          this.message.error('Dislike failed');
          return action;
        })
      ),
    { dispatch: false }
  )

  $postLikeSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postLikeSuccess),
      map(action => {
        this.store.dispatch(userAddLike({ post : action.post }));
        return action;
      })
    ),
    { dispatch: false }
  )

  $postDislikeSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postDislikeSuccess),
      map(action => {
        this.store.dispatch(userRemoveLike({ postId : action.post.id }));
        return action;
      })
    ),
    { dispatch: false }
  )


  $postAddFavorite = createEffect(
    () => this.actions$.pipe(
      ofType(postAddFavorite),
      switchMap(action => {
        return this._postService.favorite(action.post.id).pipe(
          map(() => {
            this.store.dispatch(postFavoriteSuccess({ post : action.post }));
          }),
          catchError(error => of(postFavoriteFailure({ post : action.post })))
        );
      })
    ),
    { dispatch: false }
  )
  $postRemoveFavorite = createEffect(
    () => this.actions$.pipe(
      ofType(postRemoveFavorite),
      switchMap(action => {
        // add favorite / remove handled by the same route
        return this._postService.favorite(action.post.id).pipe(
          map(() => {
            this.store.dispatch(postRemoveFavoriteSuccess({ post : action.post }));
          }),
          catchError(error => of(postFavoriteFailure({ post : action.post })))
        );
      })
    ),
    { dispatch: false }
  )

  $postAddFavoriteSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postFavoriteSuccess),
      map(action => {
        console.log('postAddFavoriteSuccess', action.post)
        this.store.dispatch(userAddFavorite({ post : action.post }));
        return action;
      })
    ),
    { dispatch: false }
  )
  $postRemoveFavoriteSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postRemoveFavoriteSuccess),
      map(action => {
        console.log('postRemoveFavoriteSuccess', action.post)
        this.store.dispatch(userRemoveFavorite({ post : action.post }));
        return action;
      })
    ),
    { dispatch: false }
  )
  $postFavoriteFailure = createEffect(
    () => this.actions$.pipe(
      ofType(postFavoriteFailure),
      map(action => {
        this.message.error('Favorite failed');
        return action;
      })
    ),
    { dispatch: false }
  )
  $postAddComment = createEffect(
    () => this.actions$.pipe(
      ofType(postAddComment),
      switchMap(action => {
        return this._commentService.addComment(action.post.id, action.comment).pipe(
          map((comment) => {
            return postAddCommentSuccess({ post : action.post , comment : comment.comment });
          }),
          catchError(error => of(postAddCommentFailure()))
        );
      })
    ),
    { dispatch: false }
  )
  $postAddCommentSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postAddCommentSuccess),
      map(action => {
        this.store.dispatch(userAddComment({ postId : action.post.id, comment : action.comment }));
        return action;
      })
    ),
    { dispatch: false }
  )

  $postAddCommentFailure = createEffect(
    () => this.actions$.pipe(
      ofType(postAddCommentFailure),
      map(action => {
        this.message.error('Comment failed');
        return action;
      })
    ),
    { dispatch: false }
  )

  $postAddSubComment = createEffect(
    () => this.actions$.pipe(
      ofType(postAddSubComment),
      switchMap(action => {
        return this._commentService.addComment(action.post.id, action.subComment).pipe(
          map((comment) => {
            return postAddSubCommentSuccess({ post : action.post , parentComments : action.parentComments, subComment : comment.comment });
          }),
          catchError(error => of(postAddCommentFailure()))
        );
      })
    ),
    { dispatch: false }
  )
  $postAddSubCommentSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postAddSubCommentSuccess),
      map(action => {
        this.store.dispatch(userAddSubComment({ postId : action.post.id, parentComments : action.parentComments, subComment : action.subComment }));
        return action;
      })
    ),
    { dispatch: false }
  )

  $postCreate = createEffect(
    () => this.actions$.pipe(
      ofType(postCreate),
      switchMap(action => {
        return this._postService.create(action.post).pipe(
          map((post) => {
            return postCreateSuccess({ post });
          }),
          catchError(error => of(postCreateFailure()))
        );
      })
    )
  )

  $postCreateSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(postCreateSuccess),
      map(action => {
        this.message.success('Post created');
        this.store.dispatch(userAddPost({ post : action.post }));
        this.router.navigate(['/']);
        return action;
      })
    ),
    { dispatch: false }
  )
  $postCreateFailure = createEffect(
    () => this.actions$.pipe(
      ofType(postCreateFailure),
      map(action => {
        this.message.error('Post creation failed');
        return action;
      })
    ),
    { dispatch: false }
  )

  constructor(
    private store : Store<AppState>,
    private _postService : PostService,
    private _commentService : CommentService,
    private actions$: Actions,
    private router : Router,
    private message: NzMessageService,
  ) {}
}
