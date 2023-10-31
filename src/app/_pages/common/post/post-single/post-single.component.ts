import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { IK_Comment, IK_Post } from 'src/_ngrx/models/post/post.model';
import { CommentListComponent } from 'src/app/_components/page_section/comment-list/comment-list.component';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'ik-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent {
  post : IK_Post | undefined;
  @ViewChild('commentList') commentList : CommentListComponent | undefined;
  usersComment : IK_Comment[] = [];
  usersComment$ : Observable<IK_Comment[]|undefined> = this.store.select(state => state.authUser.user?.postComments);
  constructor(
    private activatedRoute : ActivatedRoute,
    private postService : PostService,
    private store : Store<AppState>
  ) {
    this.postService.getById(this.activatedRoute.snapshot.params['id']).subscribe(post => {
      this.post = post;
    });
    this.usersComment$.subscribe(usersComment => {
      this.usersComment = usersComment ?? [];
    });
  }

  answerToComment(
    comment : IK_Comment
  ) {
    if ( !this.commentList ) {
      console.error('commentList is undefined');
      return;
    }
    this.commentList.onAnswerToComment(comment);
  }
}
