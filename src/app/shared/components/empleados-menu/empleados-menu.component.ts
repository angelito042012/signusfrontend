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
  styleUrl: './empleados-menu.component.css'
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
      { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/sistema/home' },

      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        items: [
          { label: 'Listado de ventas', icon: 'pi pi-list', routerLink: '/sistema/ventas' },
        ]
      },

      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/sistema/clientes'
      }
    ];
  }

  private almacenMenu(): MenuItem[] {
    return [
      { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/sistema/home' },

      {
        label: 'Inventario',
        icon: 'pi pi-box',
        items: [
          { label: 'Inventario general', icon: 'pi pi-database', routerLink: '/sistema/inventario' },
          { label: 'Operaciones', icon: 'pi pi-cog', routerLink: '/sistema/inventario/operaciones' },
          { label: 'Movimientos', icon: 'pi pi-sync', routerLink: '/sistema/inventario/movimientos' },
          { label: 'Pedidos', icon: 'pi pi-truck', routerLink: '/sistema/inventario/pedidos' }
        ]
      }
    ];
  }

  private pedidosMenu(): MenuItem[] {
    return [
      { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/sistema/home' },
      {
        label: 'Pedidos',
        icon: 'pi pi-truck',
        routerLink: '/sistema/inventario/pedidos'
      }
    ];
  }

  private adminMenu(): MenuItem[] {
    return [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/sistema/home' },

      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        items: [
          { label: 'Ventas', icon: 'pi pi-list', routerLink: '/sistema/ventas' },
          { label: 'Métodos de pago', icon: 'pi pi-credit-card', routerLink: '/sistema/metodos-pago' }
        ]
      },

      {
        label: 'Productos',
        icon: 'pi pi-tags',
        items: [
          { label: 'Productos', icon: 'pi pi-box', routerLink: '/sistema/productos' },
          { label: 'Categorías', icon: 'pi pi-sitemap', routerLink: '/sistema/categorias' }
        ]
      },

      {
        label: 'Inventario',
        icon: 'pi pi-database',
        items: [
          { label: 'Inventario', icon: 'pi pi-database', routerLink: '/sistema/inventario' },
          { label: 'Operaciones', icon: 'pi pi-cog', routerLink: '/sistema/inventario/operaciones' },
          { label: 'Movimientos', icon: 'pi pi-sync', routerLink: '/sistema/inventario/movimientos' },
        ]
      },

      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        items: [
          { label: 'Empleados', icon: 'pi pi-id-card', routerLink: '/sistema/usuarios/empleados' },
          { label: 'Clientes', icon: 'pi pi-users', routerLink: '/sistema/usuarios/clientes' }
        ]
      }
    ];
  }
}
