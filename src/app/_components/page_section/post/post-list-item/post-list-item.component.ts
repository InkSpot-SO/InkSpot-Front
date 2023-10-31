import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { postAddFavorite, postDislike, postLike, postRemoveFavorite , postDelete } from 'src/_ngrx/actions/post/post.action';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'ik-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {
  @Input() post? : IK_Post;
  @Output() onDeletePost : EventEmitter<IK_Post> = new EventEmitter<IK_Post>();
  @Input() skeleton : boolean = false;
  constructor(
    private store : Store<AppState>,
    private modalService : NzModalService
  ) {}
  likePost() {
    if( !this.post ) return;
    if ( this.post.likedByUser ) {
      this.store.dispatch(postDislike({post:this.post}));
    } else {
      this.store.dispatch(postLike({post:this.post}));
    }
    this.post = {
      ...this.post,
      likedByUser: !this.post.likedByUser,
      likesCount: this.post.likedByUser ? this.post.likesCount! - 1 : this.post.likesCount! + 1
    }
  }
  favoritePost() {
    if( !this.post ) return;
    if ( this.post.favoritedByUser ) {
      this.store.dispatch(postRemoveFavorite({post:this.post}));
    } else {
      this.store.dispatch(postAddFavorite({post:this.post}));
    }
    this.post = {
      ...this.post,
      favoritedByUser: !this.post.favoritedByUser,
      favoritesCount: this.post.favoritedByUser ? this.post.favoritesCount! - 1 : this.post.favoritesCount! + 1
    }
  }

  deletePost(post : IK_Post) {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this post?',
      nzContent: '<b style="color: red;">This action cannot be undone</b>',
      nzOkText: 'Yes',
      nzOnOk: () => this.onDeletePost.emit(post),
      nzCancelText: 'No',
    });
  }
}
