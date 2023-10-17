import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IK_Post, IK_PostRequestReponse } from 'src/_ngrx/models/post/post.model';
import { ENV } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }



  getPosts(page: number): Observable<IK_PostRequestReponse> {
    return this.http.get<IK_PostRequestReponse>(`http://localhost:8000/api/posts/all?page=${page}`).pipe(map((r) => {
      const res = {
        ...r,
        datas: r.datas.map((post) => {
          return {
            ...post,
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
