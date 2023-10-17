import { IK_UserBase, IK_UserDeepBase } from "./user-base.model";

export type IK_UserRole = "ROLE_USER" | "ROLE_ADMIN";
export interface IK_UserAuth extends IK_UserDeepBase {
  username : string;
  token : string;
  roles : IK_UserRole[];
}

export interface IK_UserAuthRequest {
  username : string;
  password : string;
}


export interface IK_UserAuthRegisterRequest extends IK_UserAuthRequest {
  firstName : string;
  lastName : string;
}


export interface  IK_UserAuthResponse {
  token : string;
  user : IK_UserAuth;
}
