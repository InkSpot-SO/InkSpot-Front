import { CanActivateFn } from '@angular/router';
import { ENV } from 'src/environnement';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem(ENV.IK.LOCAL_STORAGE.AUTH_USER) ?? null;
  if (user) {
    return false;
  }
  return true;
};
