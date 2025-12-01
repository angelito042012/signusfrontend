import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PedidoService } from '../../../../core/services/pedido.service';
import { Pedido } from '../../../../core/models/Pedido';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { VentaService } from '../../../../core/services/venta.service';
import { Venta } from '../../../../core/models/Venta';
import { DetalleVenta } from '../../../../core/models/DetalleVenta';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule, ToastModule, DialogModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  providers: [MessageService],
})
export class PedidosComponent {
  private pedidoService = inject(PedidoService);
  private ventaService = inject(VentaService);
  private messageService = inject(MessageService);

  pedidos: Pedido[] = [];
  loading = true;

  pedidoSeleccionado: Pedido | null = null; // Pedido seleccionado para el diálogo
  ventaSeleccionada: Venta | null = null; // Venta asociada al pedido
  detallesVenta: DetalleVenta[] = []; // Detalles de la venta
  mostrarModalActualizarPedido = false; // Controla la visibilidad del diálogo

  mostrarModalVenta = false;

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.loading = true; // Activar indicador de carga
    this.pedidoService.listarPedidos().subscribe({
      next: (data) => {
        this.pedidos = data; // Asignar los datos a la tabla
        this.loading = false; // Desactivar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los pedidos.',
          life: 3000,
        });
        this.loading = false; // Desactivar indicador de carga
      },
    });
  }

  actualizarTipoEnvio(idPedido: number | undefined, tipoEnvio: string): void {

    if (!idPedido) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El ID del pedido no está definido.',
        life: 3000,
      });
      return;
    }

    this.pedidoService.actualizarEstado(idPedido, tipoEnvio).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `El tipo de envío se actualizó a "${tipoEnvio}".`,
          life: 3000,
        });
        this.mostrarModalActualizarPedido = false; // Ocultar el diálogo
        this.cargarPedidos(); // Recargar la lista de pedidos
      },
      error: (err) => {
        console.error('Error al actualizar el tipo de envío:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el tipo de envío.',
          life: 3000,
        });
      },
    });
  }

  mostrarDialogoActualizarPedido(pedido: Pedido): void {
    this.pedidoSeleccionado = pedido; // Asignar el pedido seleccionado
    this.mostrarModalActualizarPedido = true; // Mostrar el diálogo
  }

  mostrarDialogoVenta(venta: Venta | undefined): void {
  if (!venta?.idVenta) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Error',
      detail: 'El pedido no tiene una venta asociada.',
      life: 3000,
    });
    return;
  }

  this.loading = true; // Activar el indicador de carga

  // Cargar la venta y sus detalles
  this.cargarVentaYDetalles(venta.idVenta).then(() => {
    this.mostrarModalVenta = true; // Mostrar el diálogo solo después de cargar los datos
  });
}

  cargarVentaYDetalles(idVenta: number): Promise<void> {
    return new Promise((resolve, reject) => {
    this.ventaService.obtenerVenta(idVenta).subscribe({
      next: (venta) => {
        this.ventaSeleccionada = venta;

        this.ventaService.listarDetalles(idVenta).subscribe({
          next: (detalles) => {
            this.detallesVenta = detalles;
            this.loading = false;
            resolve(); // Resolver la promesa cuando los datos estén cargados
          },
          error: (err) => {
            console.error('Error al cargar los detalles de la venta:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron cargar los detalles de la venta.',
              life: 3000,
            });
            this.loading = false;
            reject(err); // Rechazar la promesa en caso de error
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar la venta:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la venta asociada.',
          life: 3000,
        });
        this.loading = false;
        reject(err); // Rechazar la promesa en caso de error
      },
    });
  });
  }


}
