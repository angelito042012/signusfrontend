import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const clienteGuard: CanActivateFn = (route, state) => {
  /**
   * Clientes: ROLE_CLIENTE
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();

  if (auth.isLogged() && role === 'ROLE_CLIENTE') {
    return true;
  }

  return router.parseUrl('/cliente/login');
};
