import { IK_UserAuth } from "../../models/user/user-auth.model";

export interface AuthUserState {
  user : IK_UserAuth | null;
  loading : boolean;
}
