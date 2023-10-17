import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { PostService } from 'src/app/_services/post/post.service';
@Component({
  selector: 'ik-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts : IK_Post[] = [];
  private _page : number = 1;
  get page() {
    return this._page;
  }
  set page(page : number) {
    this._page = page;
    this.onUpdateRequest();
  }
  postsRequest = this._postService.getPosts(this.page);
  request$ = this.postsRequest.subscribe(posts => {
    this.posts = posts;
    console.log(posts);
  });

  constructor(private _postService : PostService) {}
  onUpdateRequest() {
    if ( this.request$ ) {
      this.request$.unsubscribe();
    }
    this.postsRequest = this._postService.getPosts(this.page);
  }

}
