import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, concat, concatMap, map } from 'rxjs';
import { IK_UserAuth, IK_UserAuthRegisterRequest, IK_UserAuthRequest, IK_UserAuthResponse } from 'src/_ngrx/models/user/user-auth.model';
import { ENV } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private http: HttpClient,
    private NG_message : NzMessageService,
  ) { }

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
      refresh_token : "6991b498b50a5e8545672bf761476a6bc8817357fe68256920c56b353c1bbbaaed128b52bfc5947cc6c2cdfbe6465197ccc9d9745299ebd03520d538a3f83b11"
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
