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
import { CategoriasComponent } from './features/empleados/pages/categorias/categorias.component';
import { InventarioComponent } from './features/empleados/pages/inventario/inventario.component';
import { OperacionesInventarioComponent } from './features/empleados/pages/operaciones-inventario/operaciones-inventario.component';
import { MovimientosInventarioComponent } from './features/empleados/pages/movimientos-inventario/movimientos-inventario.component';
import { PedidosComponent } from './features/empleados/pages/pedidos/pedidos.component';
import { VentasComponent } from './features/empleados/pages/ventas/ventas.component';
import { EmpleadosComponent } from './features/empleados/pages/empleados/empleados.component';
import { UsuariosClientesComponent } from './features/empleados/pages/usuarios-clientes/usuarios-clientes.component';
import { UsuariosEmpleadosComponent } from './features/empleados/pages/usuarios-empleados/usuarios-empleados.component';
import { MetodosPagoComponent } from './features/empleados/pages/metodos-pago/metodos-pago.component';
import { ClientesComponent } from './features/empleados/pages/clientes/clientes.component';
import { AdminLoginComponent } from './features/admin/pages/admin-login/admin-login.component';
import { adminGuard } from './core/guards/admin.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProductoDetalleComponent } from './features/clientes/pages/producto-detalle/producto-detalle.component';
import { ClientesLoginComponent } from './shared/components/clientes-login/clientes-login.component';
import { ClientesRegistroComponent } from './shared/components/clientes-registro/clientes-registro.component';
import { ClientesPerfilComponent } from './features/clientes/pages/clientes-perfil/clientes-perfil.component';
import { ClientesCarritoComponent } from './features/clientes/pages/clientes-carrito/clientes-carrito.component';
import { ClientesCheckoutComponent } from './features/clientes/pages/clientes-checkout/clientes-checkout.component';
import { clienteGuard } from './core/guards/cliente.guard';

export const routes: Routes = [
  //Clientes
  {
    path: '',
    component: ClientesLayoutComponent,
    children: [
      { path: '', component: ClientesHomeComponent },
      { path: 'catalogo', component: ClientesCatalogoComponent },
      { path: 'producto/:id', component: ProductoDetalleComponent },
      { path: 'perfil', component: ClientesPerfilComponent, canActivate: [clienteGuard], data: { roles: ['ROLE_CLIENTE'] } },
      { path: 'carrito', component: ClientesCarritoComponent, canActivate: [clienteGuard], data: { roles: ['ROLE_CLIENTE'] } },
      { path: 'checkout', component: ClientesCheckoutComponent, canActivate: [clienteGuard], data: { roles: ['ROLE_CLIENTE'] } },
    ],
  },
  {
    path: 'login',
    component: ClientesLoginComponent,
  },
  {
    path: 'registro',
    component: ClientesRegistroComponent,
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
  //Administradores
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'sistema',
    canActivate: [empleadoGuard],
    component: EmpleadosLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: EmpleadosHomeComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_VENTAS', 'ROLE_ALMACEN', 'ROLE_PEDIDOS'],
        },
      },
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ALMACEN'] },
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ALMACEN'] },
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ALMACEN'] },
      },
      {
        path: 'operaciones-inventario',
        component: OperacionesInventarioComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ALMACEN'] },
      },
      {
        path: 'movimientos-inventario',
        component: MovimientosInventarioComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ALMACEN'] },
      },
      {
        path: 'ventas',
        component: VentasComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_VENTAS'] },
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_VENTAS'] },
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_PEDIDOS'] },
      },
      {
        path: 'metodos-pago',
        component: MetodosPagoComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'usuarios-clientes',
        component: UsuariosClientesComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'usuarios-empleados',
        component: UsuariosEmpleadosComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
    ],
  },
  //Página no encontrada 404
  {
    path: '**',
    component: NotFoundComponent,
  },
];
