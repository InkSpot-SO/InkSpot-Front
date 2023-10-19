import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { postAddFavorite, postDislike, postLike, postRemoveFavorite } from 'src/_ngrx/actions/post/post.action';
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
  favoritePost() {
    if( !this.post ) return;
    if ( this.post.favoritedByUser ) {
      console.log('remove favorite')
      this.store.dispatch(postRemoveFavorite({post:this.post}));
    } else {
      console.log('add favorite')
      this.store.dispatch(postAddFavorite({post:this.post}));
    }
    this.post = {
      ...this.post,
      favoritedByUser: !this.post.favoritedByUser,
      favoritesCount: this.post.favoritedByUser ? this.post.favoritesCount! - 1 : this.post.favoritesCount! + 1
    }
  }
}
