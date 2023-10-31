import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IK_CommentCreateResponse } from 'src/_ngrx/models/comment/comment.model';
import { IK_Comment } from 'src/_ngrx/models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http : HttpClient
  ) { }
  addComment(postId:number,comment:string) : Observable<IK_CommentCreateResponse> {
    return this.http.post<IK_CommentCreateResponse>(`http://localhost:8000/api/posts/${postId}/comment`,{comment}).pipe(
      map((r) => {
      return {
        ...r,
        comment : {
          ...r.comment,
          isUserOwner : true
        }
      }}));
  }

  addSubComment(commentId:number,comment:string) : Observable<IK_CommentCreateResponse> {
    return this.http.post<IK_CommentCreateResponse>(`http://localhost:8000/api/comments/${commentId}/comment`,{comment}).pipe(
      map((r) => {
      return {
        ...r,
        comment : {
          ...r.comment,
          isUserOwner : true
        }
      }})
    );
  }
}
