import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { NzMessageService } from "ng-zorro-antd/message";
import { switchMap, map, catchError, of, scheduled } from "rxjs";
import { login, loginFailure, loginSuccess, logout } from "src/_ngrx/actions/auth/login.actions";
import { AuthentificationService } from "src/app/_services/authentification-service.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      switchMap(action => {
        return this._authService.login(action.user).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error })))
        );
      })
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map(action => {
          this.router.navigate(['/common/home']);
          return action;
        })
      ),
    { dispatch: false }
  );

  $loginError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        map(action => {
          return action;
        })
      ),
    { dispatch: false }
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(action => {
          this.router.navigate(['/auth/login']);
          return action;
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _authService: AuthentificationService,
    private router : Router
    ) {}
}
