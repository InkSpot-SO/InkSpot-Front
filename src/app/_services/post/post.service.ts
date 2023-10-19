import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_PostRequestReponse } from 'src/_ngrx/models/post/post.model';
import { IK_UserAuth } from 'src/_ngrx/models/user/user-auth.model';
import { ENV } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  user : IK_UserAuth|null = null;
  user$ = this.store.select(state => state.authUser.user);
  constructor(
    private store : Store<AppState>,
    private http : HttpClient
  ) {
    this.user$.subscribe(user => {
      this.user = user;
    });
   }

  getWithQueryPaginated(page:number,searchTerm:string): Observable<IK_PostRequestReponse> {
    return this.http.get<IK_PostRequestReponse>(`http://localhost:8000/api/posts/all?page=${page}&searchTerm=${searchTerm}`).pipe(map((r) => {
      const res = {
        ...r,
        datas: r.datas.map((post) => {
          return {
            ...post,
            likedByUser: this.user!.likedPosts.find((likedPost) => likedPost.id === post.id) ? true : false,
            favoritedByUser: this.user!.favoritesPosts.find((favoritePost) => favoritePost.id === post.id) ? true : false,
            postsImages: post.postsImages.map((postImage) => {
              return {
                ...postImage,
                imageName: `${ENV.SERVER_URLS.API.IMAGE}${postImage.imageName}`
              }
            })
          }
        })
      }
      return res;
    }
    ))
      ;
  }

  likePost(postId:number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/posts/${postId}/like`, {});
  }

  favorite(postId:number): Observable<any> {
    console.log('favorite' , postId)
    return this.http.post<any>(`http://localhost:8000/api/posts/${postId}/favorite`, {});
  }
}
