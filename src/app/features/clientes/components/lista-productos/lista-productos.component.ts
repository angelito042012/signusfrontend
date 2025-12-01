import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../core/models/Producto';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CarritoService } from '../../../../core/services/carrito.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, ToastModule, CardModule, ButtonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css',
  providers: [MessageService],
})
export class ListaProductosComponent {
  @Input() productos: Producto[] = [];

  private carritoService = inject(CarritoService);
  private messageService = inject(MessageService);
  private auth = inject(AuthService);

  async agregarAlCarrito(idProducto: number) {
    // Verificar si el usuario está autenticado
    const isLogged = this.auth.isLogged();
    if (!isLogged) {
      // Mostrar mensaje de advertencia
      this.messageService.add({
        severity: 'warn',
        summary: 'Debe iniciar sesión',
        detail: 'Inicie sesión para agregar productos al carrito',
        life: 2000,
      });
      return; // Detener la ejecución si no está autenticado
    }

    try {
      await this.carritoService.addProducto(idProducto, 1);

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Producto agregado',
        detail: 'Se añadió al carrito correctamente',
        life: 1500,
      });
    } catch (e) {
      // Mostrar mensaje de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo agregar al carrito',
        life: 1500,
      });
    }
  }
}
