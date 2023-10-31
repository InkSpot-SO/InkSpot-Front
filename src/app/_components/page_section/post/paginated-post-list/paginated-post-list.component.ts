import { Component, ElementRef, ViewChild } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { postDelete } from 'src/_ngrx/actions/post/post.action';
import { IK_Post, IK_PostRequestReponse } from 'src/_ngrx/models/post/post.model';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'ik-paginated-post-list',
  templateUrl: './paginated-post-list.component.html',
  styleUrls: ['./paginated-post-list.component.scss']
})
export class PaginatedPostListComponent{
  @ViewChild('#list') listRef? : ElementRef;
  posts : IK_Post[] = [];
  maxPage : number = 1;
  loading : boolean = false;
  private _page : number = 1;
  get page() {
    return this._page;
  }
  set page(page : number) {
    this._page = page;
    this.onUpdateRequest();
  }
  private _search : string = '';
  get search() {
    return this._search;
  }
  set search(search : string) {
    this._search = search;
    this.posts = [];
    this.page = 1;

    this.onUpdateRequest();
  }
  postsRequest = this._postService.getWithQueryPaginated(this.page , this.search);
  request$ = this.postsRequest.subscribe(Rpost => {
    this.postResponseHandle(Rpost);
  });


  onUpdateRequest() {
    this.loading = true;
    if ( this.request$ ) {
      this.request$.unsubscribe();
    }
    this.postsRequest = this._postService.getWithQueryPaginated(this.page , this.search);
    this.request$ = this.postsRequest.subscribe(Rpost => {
      this.postResponseHandle(Rpost);
    });
  }

  postResponseHandle( Rpost : IK_PostRequestReponse ) {
    this.maxPage = Rpost.pagination.totalPages;
    this.posts = this.posts.concat(Rpost.datas);
    this.loading = false;
  }
  showLoadMore() {
    return !this.loading && this.page != this.maxPage && this.maxPage > 1;
  }
  loadMore() {
    if (this.page < this.maxPage) {
      this.page++;
    }
  }
  onDelete(post : IK_Post) {
    this.posts = this.posts.filter(p => p.id != post.id);

    this.store.dispatch(postDelete({post:post}));
  }
  constructor(private _postService : PostService, private store : Store<AppState>) {
    this.loading = true;
  }


}
