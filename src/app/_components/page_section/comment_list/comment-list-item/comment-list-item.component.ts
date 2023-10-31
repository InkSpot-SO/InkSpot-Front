import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { IK_Comment } from "src/_ngrx/models/post/post.model";

@Component({
  selector: 'ik-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent implements OnInit {
  @Input({required:true}) comment? : IK_Comment;
  @Input() parentComment? : IK_Comment;
  @Input() usersComment? : IK_Comment[]|undefined;
  @Output() onAnswerToComment : EventEmitter<IK_Comment> = new EventEmitter<IK_Comment>();
  isUserOwner : boolean = false;
  pComment : IK_Comment | undefined;
  ngOnInit() {
    if ( !this.comment ) return;
    if ( !this.parentComment ) this.pComment = this.comment;
    if ( this.parentComment )
      this.pComment = this.generateCommentTree(this.parentComment);
    this.usersComment?.forEach(comment => {
      if ( comment.id === this.comment?.id ) {
        this.isUserOwner = true;
      }
    });
  }

  generateCommentTree(comment : IK_Comment ) : IK_Comment {
    // handle deepness to everythime add the subcomment at position 0 in subcomment for comment of deepness x
    const parent = comment;
    if (!parent.subComments || parent.subComments.length === 0) {
      return comment;
    }
    const subComment = comment.subComments[0];
    const handledSub = this.generateCommentTree(subComment);
    parent.subComments[0] = handledSub;
    return parent;

  }
  answerComment(comment: IK_Comment) {
    if ( !this.comment ) {
      console.error('comment is undefined');
      return;
    }
    this.onAnswerToComment.emit(this.parentComment);
  }
  deleteComment() {}
  reportComment() {}
}
