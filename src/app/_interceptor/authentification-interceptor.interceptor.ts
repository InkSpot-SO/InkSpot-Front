import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { Router } from '@angular/router';
import { AuthentificationService } from '../_services/authentification-service.service';
import { logout, loginSuccess } from 'src/_ngrx/actions/auth/login.actions';

@Injectable()
export class AuthentificationInterceptorInterceptor implements HttpInterceptor {
  token : string | null = null;
  token$ = this.store.select(state => state.authUser.user?.token);
  private isRefreshing = false;
  constructor(
    private store : Store<AppState>,
    private _authService : AuthentificationService
  ) {
    this.token$.subscribe(token => {
      if ( token )
        this.token = token;
      else
        this.token = null;
    });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('intercept' , req.url)
    if ( req.url.includes('login_check') || req.url.includes('register') || req.url.includes('token_refresh') ) {
      console.log('intercept', 'noheader add');
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('handle401Error');
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.token) {
        return this._authService.refreshToken().pipe(
          map((user) => {
            this.store.dispatch(loginSuccess({ user }));
            return user;
          }),
          switchMap(() => {
            this.isRefreshing = false;
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.token}`,
              },
            });
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.store.dispatch(logout());
            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }

}
