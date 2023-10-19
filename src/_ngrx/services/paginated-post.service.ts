import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {  IK_PostRequestReponse } from '../models/post/post.model';
import { HttpOptions, QueryParams } from '@ngrx/data/src/dataservices/interfaces';
import { AppState } from '../actions/app.state';
import { Store } from '@ngrx/store';
import { IK_UserAuth } from '../models/user/user-auth.model';
import { ENV } from 'src/environnement';
import { IK_PaginatedRequest } from '../models/request/paginated-request/paginated-request.model';

@Injectable()
export class PostDataService extends DefaultDataService<IK_PostRequestReponse> {
  user$ = this._store.select(state => state.authUser.user);
  user : IK_UserAuth|null = null;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator,private _store : Store<AppState>) {
    super(
    'IK_PostRequestReponse',
    http,
    httpUrlGenerator
    );

    this.user$.subscribe(user => {
      this.user = user;
    }
    );
  }

  // override getWithQuery(params?: string | HttpOptions): Observable<IK_PostRequestReponse[]> {
  //   if ( !params || typeof params === 'string' ) {
  //     return new Observable<IK_PostRequestReponse[]>();
  //   }
  //   return this.http.get<IK_PostRequestReponse[]>(`http://localhost:8000/api/posts/all`, {
  //     params
  //   } ).pipe(map((r) => {
  //     const res = {
  //       ...r[0],
  //       datas: r[0].datas.map((post) => {
  //         return {
  //           ...post,
  //           likedByUser: this.user!.likedPosts.find((likedPost) => likedPost.id === post.id) ? true : false,
  //           postsImages: post.postsImages.map((postImage) => {
  //             return {
  //               ...postImage,
  //               imageName: `${ENV.SERVER_URLS.API.IMAGE}${postImage.imageName}`
  //             }
  //           })
  //         }
  //       })
  //     }
  //     return [res];
  //   }
  //   ))
  //     ;
  // }
}
