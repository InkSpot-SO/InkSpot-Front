import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { postDislike, postLike } from 'src/_ngrx/actions/post/post.action';
@Component({
  selector: 'ik-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {
  @Input() post? : IK_Post;
  @Input() skeleton : boolean = false;
  constructor(
    private store : Store<AppState>
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
}
