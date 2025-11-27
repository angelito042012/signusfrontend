import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { DrawerModule } from 'primeng/drawer';
import { MenuItem, MessageService } from 'primeng/api';

import { ClienteService } from '../../../core/services/cliente.service';
import { CarritoService } from '../../../core/services/carrito.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-clientes-header',
  standalone: true,
  imports: [RouterLink, ButtonModule, MenubarModule, CommonModule, DrawerModule, ToastModule],
  templateUrl: './clientes-header.component.html',
  styleUrl: './clientes-header.component.css',
  providers: [MessageService],
})
export class ClientesHeaderComponent implements OnInit {
  private auth = inject(AuthService);
  private clienteService = inject(ClienteService);
  private carritoService = inject(CarritoService);
  private messageService = inject(MessageService);
  usuario = this.auth.getDecoded();

  get isLogged() {
    return this.auth.isLogged();
  }

  items: MenuItem[] = [];

  nombreUsuario = '';

  carritoDrawer = false;

  ngOnInit() {
    if (this.auth.isLogged()) {
      const email = this.auth.getDecoded().sub; // Asumiendo que el email está en el campo 'sub' del token

      //console.log(this.auth.getDecoded());

      this.clienteService.obtenerClientePorEmail(email).subscribe({
        next: (res) => {
          const nombres = res.nombres.split(' ')[0]; // Obtiene el primer nombre
          const apellidos = res.apellidos.split(' ')[0]; // Obtiene el primer apellido
          this.nombreUsuario = `${nombres} ${apellidos}`; // Asigna el primer nombre y apellido
          this.cargarMenu();
        },
      });
      this.carritoService.loadCarritoFromUser();
    } else {
      this.cargarMenu();
    }
  }

  cargarMenu() {
    const logged = this.auth.isLogged();
    const usuario = this.auth.getDecoded();

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Catálogo',
        icon: 'pi pi-book',
        routerLink: '/catalogo',
      },
      {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        //command: () => this.auth.isLogged() ? this.auth.router.navigate(['/carrito']) : this.auth.router.navigate(['/login'])
        command: () => {
          this.carritoDrawer = true;
        },
      },
      ...(logged ? this.menuUsuario(usuario) : this.menuInvitado()),
    ];
  }

  menuInvitado(): MenuItem[] {
    return [
      {
        label: 'Iniciar Sesión',
        icon: 'pi pi-user',
        routerLink: '/login',
      },
    ];
  }

  menuUsuario(usuario: any): MenuItem[] {
    return [
      {
        label: this.nombreUsuario,
        icon: 'pi pi-user',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-id-card',
            routerLink: '/perfil',
          },
          {
            label: 'Ver carrito completo',
            icon: 'pi pi-shopping-cart',
            routerLink: '/carrito',
          },
          {
            label: 'Mis Pedidos',
            icon: 'pi pi-shopping-bag',
            routerLink: '/pedidos',
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => this.auth.logout(),
          },
        ],
      },
    ];
  }

  detalles = this.carritoService.detalles;
  totalItems = this.carritoService.totalItems;
  totalPrice = this.carritoService.totalPrice;

  async updateCantidad(d: any, nuevaCantidad: number) {
    try {
      if (nuevaCantidad <= 0) {
        await this.delete(d.idDetalle);
        return;
      }
      await this.carritoService.updateCantidad(d.idDetalle, nuevaCantidad);

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Cantidad actualizada',
        detail: `La cantidad del producto "${d.producto?.nombre}" fue actualizada a ${nuevaCantidad}.`,
        life: 1500,
      });
    } catch (error) {
      // Mostrar mensaje de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error al actualizar',
        detail: `No se pudo actualizar la cantidad del producto "${d.producto?.nombre}".`,
        life: 1500,
      });
    }
  }

  async delete(idDetalle: number) {
    try {
      await this.carritoService.deleteDetalle(idDetalle);

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Producto eliminado',
        detail: 'El producto fue eliminado del carrito correctamente.',
        life: 1500,
      });
    } catch (error) {
      // Mostrar mensaje de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error al eliminar',
        detail: 'No se pudo eliminar el producto del carrito.',
        life: 1500,
      });
    }
  }

}
