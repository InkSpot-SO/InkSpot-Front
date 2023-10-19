import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IK_Post, IK_PostRequestReponse } from '../models/post/post.model';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { AppState } from '../actions/app.state';
import { Store } from '@ngrx/store';
import { IK_UserAuth } from '../models/user/user-auth.model';
import { ENV } from 'src/environnement';

@Injectable()
export class PostDataService extends DefaultDataService<IK_Post> {
  user$ = this._store.select(state => state.authUser.user);
  user : IK_UserAuth|null = null;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator,private _store : Store<AppState>) {
    super('IK_Post', http, httpUrlGenerator);
    this.user$.subscribe(user => {
      this.user = user;
    }
    );
  }

  getWithQueryPaginated(params: string | HttpOptions): Observable<IK_PostRequestReponse> {
    const page = (params as any).page || 1;
    const searchTerm = (params as any).searchTerm || '';
    return this.http.get<IK_PostRequestReponse>(`http://localhost:8000/api/posts/all?page=${page}&searchTerm=${searchTerm}`).pipe(map((r) => {
      const res = {
        ...r,
        datas: r.datas.map((post) => {
          return {
            ...post,
            likedByUser: this.user!.likedPosts.find((likedPost) => likedPost.id === post.id) ? true : false,
            postsImages: post.postsImages.map((postImage) => {
              return {
                ...postImage,
                imageName: `${ENV.SERVER_URLS.API.IMAGE}${postImage.imageName}`
              }
            })
          }
        })
      }
      console.log(res);
      return res;
    }
    ))
      ;
  }
}
