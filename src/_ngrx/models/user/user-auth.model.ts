import { IK_UserBase } from "./user-base.model";

export type IK_UserRole = "ROLE_USER" | "ROLE_ADMIN";
export interface IK_UserAuth extends IK_UserBase {
  token : string;
  roles : IK_UserRole[];
}
