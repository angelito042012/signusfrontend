import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PedidoService } from '../../../../core/services/pedido.service';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../../core/services/venta.service';
import { ButtonModule } from 'primeng/button';
import { DetalleVenta } from '../../../../core/models/DetalleVenta';

@Component({
  selector: 'app-clientes-pedidos',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './clientes-pedidos.component.html',
  styleUrl: './clientes-pedidos.component.css'
})
export class ClientesPedidosComponent implements OnInit{
  auth = inject(AuthService);
  pedidoService = inject(PedidoService);

  pedidos: any[] = [];
  detallesVenta: { [idVenta: number]: DetalleVenta[] } = {}; // Usar el modelo DetalleVenta
  cargando = true;



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
        }
      });
  }

  cargarDetallesVenta(idPedido: number): void {
    if (this.detallesVenta[idPedido]) {
      // Si ya se cargaron los detalles, no volver a cargar
      return;
    }

    this.pedidoService.listarDetallesPedido(idPedido).subscribe({
      next: (res: DetalleVenta[]) => {
        this.detallesVenta[idPedido] = res; // Almacenar los detalles en el objeto
      },
      error: (err) => {
        console.error(`Error al cargar detalles del pedido ${idPedido}:`, err);
      }
    });
  }

  formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getColorEstado(estado: string) {
    switch (estado) {
      case 'PENDIENTE': return 'bg-yellow-100 text-yellow-700';
      case 'EN PROCESO': return 'bg-blue-100 text-blue-700';
      case 'EN CAMINO': return 'bg-indigo-100 text-indigo-700';
      case 'ENTREGADO': return 'bg-green-100 text-green-700';
      case 'CANCELADO': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
