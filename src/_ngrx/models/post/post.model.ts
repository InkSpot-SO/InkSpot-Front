import { IK_Image } from "../image/image-api.model";
import { IK_PaginatedRequest } from "../request/paginated-request/paginated-request.model";
import { IK_UserBase } from "../user/user-base.model";
  export interface IK_Post {
    id : number;
    description : string;
    postsImages : IK_Image[];
    createdBy? : IK_UserBase
    likedByUser? : boolean;
    likesCount? : number;
    favoritesCount? : number;
    commentsCount? : number;
    favoritedByUser? : boolean;
  }

  export interface IK_PostRequestReponse extends IK_PaginatedRequest<IK_Post> {}
