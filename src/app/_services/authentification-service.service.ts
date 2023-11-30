import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, concat, concatMap, map } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_UserAuth, IK_UserAuthRegisterRequest, IK_UserAuthRequest, IK_UserAuthResponse } from 'src/_ngrx/models/user/user-auth.model';
import { ENV } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  user : IK_UserAuth | null = null;
  constructor(
    private http: HttpClient,
    private NG_message : NzMessageService,
    private store : Store<AppState>,
  ) {
    this.store.select(s => s.authUser.user).subscribe(user => {
      this.user = user;
    });
   }
   updateUserInfos(user: IK_UserAuth) : Observable<IK_UserAuth> {
    return this.http.put<IK_UserAuthResponse>('http://localhost:8000/api/users/'+user.id, user).pipe(
      map((user) => {
        this.NG_message.success('User infos updated');
        return this.formatResponseUser(user);
      }),
      catchError((error) => {
        this.NG_message.error('User infos update failed');
        throw error;
      })
    );
   };
  register(user: IK_UserAuthRegisterRequest) : Observable<IK_UserAuth> {
    const { messageId } = this.NG_message.loading('Registration...', { nzDuration: 0 });
    return this.http.post<IK_UserAuthResponse>('http://localhost:8000/api/register', user).pipe(
      map((user) => {
        this.NG_message.remove(messageId);
        this.NG_message.success('Registration success');
        return this.formatResponseUser(user);
        }),
      catchError((error) => {
        this.NG_message.remove(messageId);
        const message = error.status === 400 ? 'Registration : bad informations' : 'Registration failed';
        this.NG_message.error('Registration failed');
        throw error;
      })
    );
  }
  login(user: IK_UserAuthRequest) : Observable<IK_UserAuth> {
    const { messageId } = this.NG_message.loading('Login...', { nzDuration: 0 });
    return this.http.post<IK_UserAuthResponse>('http://localhost:8000/api/login_check', user).pipe(
      map((user) => {
        console.log('login', user)
        this.NG_message.remove(messageId);
        this.NG_message.success('Login success');
        return this.formatResponseUser(user);
      }),
      catchError((error) => {
        this.NG_message.remove(messageId);
        const message = error.status === 401 ? 'Wrong credentials. Please try again' : 'Login failed';
        this.NG_message.error(message);
        throw error;
      })
    );
  }



  refreshToken() : Observable<IK_UserAuth> {
    return this.http.post<IK_UserAuthResponse>('http://localhost:8000/api/token_refresh', {
      "refresh_token": "1db85bf64da5e9e1487bb546148994374a3fa4cae4faf5cc3442d3ab3d9a6460533943cf06a12621990a4640ff60876d5f763bc920a5769cfb6346dd51ac76e7"
  }).pipe(
      map((user) => {
        return this.formatResponseUser(user);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }



  formatResponseUser(user: IK_UserAuthResponse) : IK_UserAuth {
    return {
      ...user.user,
      token : user.token,
    }
  }
}
