import { IK_Image } from "../image/image-api.model";
import { IK_CreateRequestResponse } from "../request/create/create-request";
import { IK_PaginatedRequest } from "../request/paginated-request/paginated-request.model";
import { IK_UserBase } from "../user/user-base.model";
  export interface IK_Post {
    id : number;
    description : string;
    postsImages : IK_Image[];
    comments : IK_Comment[];
    createdBy? : IK_UserBase
    likesCount? : number;
    favoritesCount? : number;
    isUserOwner? : boolean;
    likedByUser : boolean;
    favoriteByUser : boolean;
  }

  export interface IK_Comment {
    id : number;
    text : string;
    createdBy : IK_UserBase;
    isUserOwner : boolean;
    createdAt : Date;
    subComments : IK_Comment[];
  }

export interface IK_PostRequestReponse extends IK_PaginatedRequest<IK_Post> {}
export interface IK_PostCreateRequestResponse extends IK_CreateRequestResponse<IK_Post> {}
