import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { Router } from '@angular/router';

@Injectable()
export class AuthentificationInterceptorInterceptor implements HttpInterceptor {
  token : string | null = null;
  token$ = this.store.select(state => state.authUser.user?.token);
  constructor(
    private store : Store<AppState>,
    private router : Router
  ) {
    this.token$.subscribe(token => {
      if ( token )
        this.token = token;
      else
        this.token = null;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( this.router.url.includes('auth')) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}
