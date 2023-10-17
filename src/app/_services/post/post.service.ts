import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { ENV } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }



  getPosts(page : number) : Observable<IK_Post[]> {
    return this.http.get<IK_Post[]>(`http://localhost:8000/api/posts/all?page=${page}`);
  }
}
