import { IK_Comment } from "src/_ngrx/models/post/post.model";

export function getCommentTree(commentId: number, comments: IK_Comment[]): IK_Comment[] | null {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      return comments.slice(0, i + 1);
    }
    let foundComments = getCommentTree(commentId, comments[i].subComments);
    if (foundComments) {
      return [...comments.slice(0, i + 1), ...foundComments];
    }
  }
  return null;
}



export function findSubComment( comment : IK_Comment , subCommentId : number ) : IK_Comment {
  return comment.subComments.find( (subComment) => subComment.id === subCommentId )!;
}
