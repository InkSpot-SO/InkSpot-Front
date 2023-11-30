import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_Comment, IK_Post, IK_PostCreateRequestResponse, IK_PostRequestReponse } from 'src/_ngrx/models/post/post.model';
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

  create(post: FormData): Observable<IK_Post> {
    return this.http.post<IK_PostCreateRequestResponse>('http://localhost:8000/api/posts/create', post).pipe(map((post) => {
      return this.processPost(post.data);
    }));
  }

  getWithQueryPaginated(page:number,searchTerm:string): Observable<IK_PostRequestReponse> {
    return this.http.get<IK_PostRequestReponse>(`http://localhost:8000/api/posts/all?page=${page}&searchTerm=${searchTerm}`).pipe(map((r) => {
    console.log(r);
    const res = {
        ...r,
        datas: r.datas.map((post) => {
          return this.processPost(post);
        })
      }
      return res;
    }
    ))
      ;
  }
  getUserFavoritePosts() : Observable<IK_Post[]> {
    return this.http.get<IK_Post[]>(`http://localhost:8000/api/users/${this.user?.id}/favorites`).pipe(map((posts) => {
      return posts.map((post) => {

        return this.processPost(post);
      })
    }));
  }
  getUserLikedPosts() : Observable<IK_Post[]> {
    return this.http.get<IK_Post[]>(`http://localhost:8000/api/users/${this.user?.id}/likes`).pipe(map((posts) => {
      return posts.map((post) => {
        return this.processPost(post);
      })
    }));
  }

  getUserPosts() : Observable<IK_Post[]> {
    return this.http.get<IK_Post[]>(`http://localhost:8000/api/users/${this.user?.id}/created`).pipe(map((posts) => {
      return posts.map((post) => {
        return this.processPost(post);
      })
    }));
  }

  private processPost(post : IK_Post) {
    return {
      ...post,
      isUserOwner: this.user!.id === post.createdBy?.id,
      comments: (post.comments ?? []).map((comment) => {
        return {
          ...comment,
          subComments: this.recursiveCommentHandling(comment.subComments ?? []),
          isUserOwner: this.user?.postComments.find((postComment) => postComment.id === comment.id) ? true : false
        }
      }),
      postsImages: post.postsImages.map((postImage) => {
        return {
          ...postImage,
          imageName: `${ENV.SERVER_URLS.API.IMAGE}${postImage.imageName}`
        }
      })
    }
  }

  private recursiveCommentHandling(comments : IK_Comment[]): IK_Comment[] {
    return comments.map((comment) => {
      return {
        ...comment,
        isUserOwner: this.user?.postComments.find((postComment) => postComment.id === comment.id) ? true : false,
        comments: this.recursiveCommentHandling(comment.subComments ?? [])
      }
    })
  }

  getById(id:number): Observable<IK_Post> {
    return this.http.get<IK_Post>(`http://localhost:8000/api/posts/${id}`).pipe(map((post) => {
      return this.processPost(post);
    }));
  }


  likePost(postId:number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/posts/${postId}/like`, {});
  }

  favorite(postId:number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/posts/${postId}/favorite`, {});
  }

  delete(postId:number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/posts/${postId}/delete`);
  }
}
