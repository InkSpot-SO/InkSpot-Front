import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ENV } from 'src/environnement';

export const unauthGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem(ENV.IK.LOCAL_STORAGE.AUTH_USER) ?? null;
  if (!user) {
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
