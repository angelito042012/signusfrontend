import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  /**
   * Admins: ROLE_ADMIN
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();

  if (auth.isLogged() && role === 'ROLE_ADMIN') {
    return true;
  }

  return router.parseUrl('/admin/login');
};
