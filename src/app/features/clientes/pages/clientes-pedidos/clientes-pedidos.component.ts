import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PedidoService } from '../../../../core/services/pedido.service';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../../core/services/venta.service';
import { ButtonModule } from 'primeng/button';
import { DetalleVenta } from '../../../../core/models/DetalleVenta';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes-pedidos',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressSpinner, ToastModule],
  templateUrl: './clientes-pedidos.component.html',
  styleUrl: './clientes-pedidos.component.css',
  providers: [MessageService],
})
export class ClientesPedidosComponent implements OnInit {
  auth = inject(AuthService);
  pedidoService = inject(PedidoService);
  messageService = inject(MessageService);

  pedidos: any[] = [];
  detallesPedido: { [idPedido: number]: DetalleVenta[] } = {}; // Usar el modelo DetalleVenta
  cargando = true;
  cargandoDetalles: { [idPedido: number]: boolean } = {}; // Estado de carga por pedido

  ngOnInit(): void {
    const email = this.auth.getDecoded().sub;
    this.pedidoService.listarPorEmail(email).subscribe({
      next: (res) => {
        this.pedidos = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      },
    });
  }

  cargarDetallesPedido(idPedido: number): void {
    // Mostrar spinner para el pedido específico
    this.cargandoDetalles[idPedido] = true;

    if (this.detallesPedido[idPedido]) {
      // Si ya se cargaron los detalles, no volver a cargar
      this.cargandoDetalles[idPedido] = false;
      return;
    }

    this.pedidoService.listarDetallesPedido(idPedido).subscribe({
      next: (res: DetalleVenta[]) => {
        this.detallesPedido[idPedido] = res; // Almacenar los detalles en el objeto
      },
      error: (err) => {
        console.error(`Error al cargar detalles del pedido ${idPedido}:`, err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `No se pudieron cargar los detalles del pedido #${idPedido}.`,
          life: 3000,
        });
        this.cargandoDetalles[idPedido] = false; // Ocultar spinner en caso de error
      },
      complete: () => {
        this.cargandoDetalles[idPedido] = false; // Ocultar spinner cuando termine la carga
      },
    });
  }

  formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getColorEstado(estado: string) {
    switch (estado) {
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-700';
      case 'EN PROCESO':
        return 'bg-blue-100 text-blue-700';
      case 'EN CAMINO':
        return 'bg-indigo-100 text-indigo-700';
      case 'ENTREGADO':
        return 'bg-green-100 text-green-700';
      case 'CANCELADO':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
