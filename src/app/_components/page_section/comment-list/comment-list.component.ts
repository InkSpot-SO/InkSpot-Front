import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { postAddSubComment } from 'src/_ngrx/actions/post/post.action';
import { IK_Comment, IK_Post } from 'src/_ngrx/models/post/post.model';
import { CommentService } from 'src/app/_services/comment/comment.service';

@Component({
  selector: 'ik-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input({ required: true }) post?: IK_Post;
  @Output() postChange: EventEmitter<IK_Post> = new EventEmitter<IK_Post>();
  constructor(
    private _commentService: CommentService,
    private store: Store<AppState>
  ) { }
  newCommentTxt: string = '';
  placeholderTxt: string = 'Comment...';
  answeringToComment: IK_Comment | null = null;
  addComment() {
    const tempCommentTxt = this.newCommentTxt;
    this.newCommentTxt = '';
    if (!this.answeringToComment)
      this.sendBasicComment(tempCommentTxt);
    else
      this.sendSubComment(tempCommentTxt);
  }

  sendBasicComment(txt: string) {
    console.log("send basic comment");
    this._commentService.addComment(this.post!.id, txt).subscribe({
      next: (value) => {
        if (!this.post) return;
        if (!this.post?.comments) this.post.comments = [];
        this.postChange.emit({
          ...this.post,
          comments: [
            value.comment,
            ...this.post?.comments,
          ]
        });

      },
      error: (err) => {
        this.newCommentTxt = txt;
      }
    });
  }

  sendSubComment(txt: string) {
    console.log("send sub comment")
    if (!this.answeringToComment) return;
    this.store.dispatch(postAddSubComment({ post : this.post!, parentComments : this.answeringToComment, subComment : txt }));
    this._commentService.addSubComment(this.answeringToComment.id, txt).subscribe({
      next: (value) => {
        if (!this.post) return;
        this.postChange.emit({
          ...this.post,
          comments: this.post?.comments.map(comment => {
            if (comment.id == this.answeringToComment?.id) {
              if (!comment.subComments) comment.subComments = [];
              return {
                ...comment,
                subComments: [
                  value.comment,
                  ...comment.subComments
                ]
              }
            }
            return comment;
          })
        });
        this.answeringToComment = null;
        this.placeholderTxt = 'Comment...';
      },
      error: (err) => {
        this.newCommentTxt = txt;
      }
    });
  }

  onAnswerToComment(comment: IK_Comment) {
    this.answeringToComment = comment;
    console.log(this.answeringToComment);
    this.placeholderTxt = `Answer...`;
  }
}
