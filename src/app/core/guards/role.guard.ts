import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  /**
   * Protege rutas que requieren roles específicos.
   * Uso:  data: { roles: ['ROLE_VENTAS'] }
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data?.['roles'] as string[] | undefined;
  const userRole = auth.getRole();

  // No role or not authenticated
  if (!auth.isLogged() || !userRole) {
    return router.parseUrl('/login'); // ruta fallback genérica
  }

  // Si la ruta no define roles, permitir
  if (!expectedRoles || expectedRoles.length === 0) return true;

  // Validación estricta
  if (expectedRoles.includes(userRole)) return true;

  return router.parseUrl('/no-autorizado');
};
