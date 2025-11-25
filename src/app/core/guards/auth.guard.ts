import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  /**
   * Verifica que exista un token válido.
   * No verifica roles — solo autenticación.
   */

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged()) return true;
  // ruta fallback genérica
  return router.parseUrl('/login');

  /*
  // Rutas públicas dentro de /sistema: /sistema/login y /sistema/registro
  const url = state.url;
  if (url === '/sistema/login' || url === '/sistema/registro') {
    return true;
  }

  // Si no hay token válido, redirigir a login
  if (!auth.isLogged()) {
    return router.parseUrl('/sistema/login');
  }

  // Si la ruta exige roles, comprobar
  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  if (!requiredRoles || requiredRoles.length === 0) {
    // no se requiere rol específico, permitir
    return true;
  }

  const userRole = auth.getRole(); // p.ej. "ROLE_ADMIN"
  if (!userRole) {
    return router.parseUrl('/sistema/login');
  }

  // Simplifica comprobando si userRole incluye alguno de los requiredRoles
  const allowed = requiredRoles.some(r => userRole === r || userRole.includes(r));
  return allowed ? true : router.parseUrl('/sistema/login');
  */
};
