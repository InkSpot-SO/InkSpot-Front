import {Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { switchMap, map, catchError, of } from "rxjs";
import { AppState } from "src/_ngrx/actions/app.state";
import { userAddLike, userRemoveLike } from "src/_ngrx/actions/auth/login.actions";
import { postDislike, postDislikeFailure, postDislikeSuccess, postLike, postLikeFailure, postLikeSuccess } from "src/_ngrx/actions/post/post.action";
import { PostService } from "src/app/_services/post/post.service";


@Injectable()
export class PostEffects {
  $likePost = createEffect(
    () => this.actions$.pipe(
      ofType(postLike),
      switchMap(action => {
        return this._postService.likePost(action.post.id).pipe(
          map(( msss) => {
            console.log(msss);
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
            console.log(r);
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

  constructor(
    private store : Store<AppState>,
    private _postService : PostService,
    private actions$: Actions,
    private message: NzMessageService,
  ) {}
}