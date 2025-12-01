import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PanelMenu, PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-empleados-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelMenuModule, PanelMenu],
  templateUrl: './empleados-menu.component.html',
  styleUrl: './empleados-menu.component.css',
})
export class EmpleadosMenuComponent implements OnInit {
  private auth = inject(AuthService);

  items: MenuItem[] = [];
  role: string | null = null;

  ngOnInit(): void {
    this.role = this.auth.getRole();

    this.items = this.getMenuByRole(this.role);
  }

  // ---------------------------
  // MENÚ DINÁMICO POR ROL
  // ---------------------------
  getMenuByRole(role: string | null): MenuItem[] {
    // ADMIN → acceso total
    if (role === 'ROLE_ADMIN') {
      return this.adminMenu();
    }

    // VENTAS
    if (role === 'ROLE_VENTAS') {
      return this.ventasMenu();
    }

    // ALMACÉN
    if (role === 'ROLE_ALMACEN') {
      return this.almacenMenu();
    }

    // PEDIDOS
    if (role === 'ROLE_PEDIDOS') {
      return this.pedidosMenu();
    }

    // fallback
    return [];
  }

  // ---------------------------
  // MENÚS POR ROL
  // ---------------------------

  private ventasMenu(): MenuItem[] {
    return [
      {
        label: 'Inicio',
        icon: 'pi pi-chart-bar',
        routerLink: '/sistema/home',
      },

      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'Listado de ventas',
            icon: 'pi pi-list',
            routerLink: '/sistema/ventas',
          },
          {
            label: 'Registrar venta física',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/ventas/registrar',
          }
        ],
      },

      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/sistema/clientes',
      },

      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        iconStyle: { 'color': 'red' },
        command: () => this.auth.logout(),
      },
    ];
  }

  private almacenMenu(): MenuItem[] {
    return [
      {
        label: 'Inicio',
        icon: 'pi pi-chart-bar',
        routerLink: '/sistema/home',
      },

      {
        label: 'Productos',
        icon: 'pi pi-tags',
        items: [
          {
            label: 'Lista de productos',
            icon: 'pi pi-box',
            routerLink: '/sistema/productos',
          },
          {
            label: 'Registrar producto',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/productos/registrar',
          }
        ],
      },

      {
        label: 'Inventario',
        icon: 'pi pi-box',
        items: [
          {
            label: 'Inventario general',
            icon: 'pi pi-database',
            routerLink: '/sistema/inventario',
          },
          {
            label: 'Operaciones',
            icon: 'pi pi-cog',
            routerLink: '/sistema/operaciones-inventario',
          },
          {
            label: 'Movimientos',
            icon: 'pi pi-sync',
            routerLink: '/sistema/movimientos-inventario',
          },
          {
            label: 'Registrar operación',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/operaciones-inventario/registrar',
          },
        ],
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        iconStyle: { 'color': 'red' },
        command: () => this.auth.logout(),
      },
    ];
  }



  private pedidosMenu(): MenuItem[] {
    return [
      {
        label: 'Inicio',
        icon: 'pi pi-chart-bar',
        routerLink: '/sistema/home',
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-truck',
        routerLink: '/sistema/inventario/pedidos',
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        iconStyle: { 'color': 'red' },
        command: () => this.auth.logout(),
      },
    ];
  }

  private adminMenu(): MenuItem[] {
    return [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/sistema/home' },

      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'Listado de Ventas',
            icon: 'pi pi-list',
            routerLink: '/sistema/ventas',
          },
          {
            label: 'Registrar venta física',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/ventas/registrar',
          }
        ],
      },

      {
        label: 'Métodos de pago',
        icon: 'pi pi-credit-card',
        routerLink: '/sistema/metodos-pago',
      },

      {
        label: 'Productos',
        icon: 'pi pi-tags',
        items: [
          {
            label: 'Lista de productos',
            icon: 'pi pi-box',
            routerLink: '/sistema/productos',
          },
          {
            label: 'Registrar producto',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/productos/registrar',
          },
          {
            label: 'Categorías',
            icon: 'pi pi-sitemap',
            routerLink: '/sistema/categorias',
          },
        ],
      },

      {
        label: 'Inventario',
        icon: 'pi pi-database',
        items: [
          {
            label: 'Inventario',
            icon: 'pi pi-database',
            routerLink: '/sistema/inventario',
          },
          {
            label: 'Operaciones',
            icon: 'pi pi-cog',
            routerLink: '/sistema/operaciones-inventario',
          },
          {
            label: 'Movimientos',
            icon: 'pi pi-sync',
            routerLink: '/sistema/movimientos-inventario',
          },
          {
            label: 'Registrar operación',
            icon: 'pi pi-plus-circle',
            routerLink: '/sistema/operaciones-inventario/registrar',
          },
        ],
      },

      {
        label: 'Pedidos',
        icon: 'pi pi-truck',
        routerLink: '/sistema/pedidos',
      },

      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Empleados',
            icon: 'pi pi-id-card',
            routerLink: '/sistema/empleados',
          },
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            routerLink: '/sistema/clientes',
          },
        ],
      },

      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        iconStyle: { 'color': 'red' },
        command: () => this.auth.logout(),
      },
    ];
  }
}
