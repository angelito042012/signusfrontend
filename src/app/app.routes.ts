import { Routes } from '@angular/router';
import { ClientesLayoutComponent } from './layouts/clientes-layout/clientes-layout.component';
import { ClientesHomeComponent } from './features/clientes/pages/clientes-home/clientes-home.component';
import { ClientesCatalogoComponent } from './features/clientes/pages/clientes-catalogo/clientes-catalogo.component';
import { EmpleadosLayoutComponent } from './layouts/empleados-layout/empleados-layout.component';
import { EmpleadosHomeComponent } from './features/empleados/pages/empleados-home/empleados-home.component';
import { ProductosComponent } from './features/empleados/pages/productos/productos.component';
import { EmpleadosLoginComponent } from './features/empleados/pages/empleados-login/empleados-login.component';
import { NoAutorizadoComponent } from './shared/components/no-autorizado/no-autorizado.component';
import { empleadoGuard } from './core/guards/empleado.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  //Clientes
  {
    path: '',
    component: ClientesLayoutComponent,
    children: [
      { path: '', component: ClientesHomeComponent },
      { path: 'catalogo', component: ClientesCatalogoComponent },
      // en el futuro aquí puedes agregar:
      // { path: 'producto/:id', component: ProductDetailComponent }
      // { path: 'carrito', component: CartComponent }
      // { path: 'perfil', component: PerfilComponent }
    ],
  },
  {
    path: 'no-autorizado',
    component: NoAutorizadoComponent,
  },
  //Empleados
  {
    path: 'sistema/login',
    component: EmpleadosLoginComponent,
  },
  {
    path: 'sistema',
    canActivate: [empleadoGuard],
    component: EmpleadosLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: EmpleadosHomeComponent },
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_VENTAS'] },
      },
    ],
  },
];
