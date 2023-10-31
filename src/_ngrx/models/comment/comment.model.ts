import { IK_Comment } from "../post/post.model";

export interface IK_CommentCreateResponse {
  message : string;
  comment : IK_Comment;
}
