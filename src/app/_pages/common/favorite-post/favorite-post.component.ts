import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { postDelete } from 'src/_ngrx/actions/post/post.action';
import { IK_Post } from 'src/_ngrx/models/post/post.model';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'ik-favorite-post',
  templateUrl: './favorite-post.component.html',
  styleUrls: ['./favorite-post.component.scss']
})
export class FavoritePostComponent {
  loading = true;
  posts: IK_Post[] = [];
  constructor(
    private _postService: PostService,
    private _store : Store<AppState>
  ) { }


  requestPosts() {
    this.loading = true;
    this._postService.getUserFavoritePosts().subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }
  ngOnInit(): void {
    this.requestPosts();
  }

  onDelete(post: IK_Post) {
    this._store.dispatch(postDelete({ post }));
  }
}

