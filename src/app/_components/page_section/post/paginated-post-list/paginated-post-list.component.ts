import { Component } from '@angular/core';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'ik-paginated-post-list',
  templateUrl: './paginated-post-list.component.html',
  styleUrls: ['./paginated-post-list.component.scss']
})
export class PaginatedPostListComponent {
  posts : IK_Post[] = [];
  maxPage : number = 1;
  private _page : number = 2;
  get page() {
    return this._page;
  }
  set page(page : number) {
    this._page = page;
    this.onUpdateRequest();
  }
  postsRequest = this._postService.getPosts(this.page);
  request$ = this.postsRequest.subscribe(Rpost => {
    this.posts =  Rpost.datas;
    this.maxPage = Rpost.pagination.totalPages;

  });

  constructor(private _postService : PostService) {}
  onUpdateRequest() {
    if ( this.request$ ) {
      this.request$.unsubscribe();
    }
    this.postsRequest = this._postService.getPosts(this.page);
  }

}
