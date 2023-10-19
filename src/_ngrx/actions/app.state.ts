import { AuthUserState } from "../states/auth/auth-user.state";
import { PostState } from "../states/post/post.state";

export interface AppState {
  authUser : AuthUserState;
}
