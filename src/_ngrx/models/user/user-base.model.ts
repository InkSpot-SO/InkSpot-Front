import { IK_Post } from "../post/post.model";

export interface IK_UserBase {
  id : number;
  pseudo : string;
}

export interface IK_UserDeepBase extends IK_UserBase {
  first_name : string;
  last_name : string;
  FollowedUsers : IK_UserBase[];
  FollowingUsers : IK_UserBase[];
  createdPosts : IK_Post[];
}
