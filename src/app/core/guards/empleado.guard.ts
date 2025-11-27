import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const empleadoGuard: CanActivateFn = (route, state) => {
  /**
   * Empleados:
   * - ROLE_VENTAS
   * - ROLE_ALMACEN
   * - ROLE_PEDIDOS
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed = ['ROLE_ADMIN', 'ROLE_VENTAS', 'ROLE_ALMACEN', 'ROLE_PEDIDOS'];
  //se coloca ROLE_ADMIN para que los admin tambien puedan acceder a las rutas de empleados
  const role = auth.getRole();

  if (auth.isLogged() && role && allowed.includes(role)) {
    return true;
  }

  return router.parseUrl('/sistema/login');
};
