import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CarritoService } from '../../../../core/services/carrito.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes-carrito',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule, ToastModule, RouterLink],
  templateUrl: './clientes-carrito.component.html',
  styleUrl: './clientes-carrito.component.css',
  providers: [MessageService],
})
export class ClientesCarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private messageService = inject(MessageService);

  // Signals expuestas al HTML
  detalles = this.carritoService.detalles;
  totalPrice = this.carritoService.totalPrice;
  carrito = this.carritoService.carrito; // ⬅️ añadiremos esta en el service

  async ngOnInit() {
    await this.carritoService.loadCarritoFromUser();
  }

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
