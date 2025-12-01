import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { VentaService } from '../../../../core/services/venta.service';
import { Venta } from '../../../../core/models/Venta';
import { DetalleVenta } from '../../../../core/models/DetalleVenta';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule, DialogModule, ToastModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
  providers: [MessageService],
})
export class VentasComponent implements OnInit {
  private ventaService = inject(VentaService);
  private messageService = inject(MessageService);

  ventas: Venta[] = [];

  loading = true;

  detalles: DetalleVenta[] = [];
  ventaSeleccionada: Venta | null = null;

  mostrarDetalles = false; // Controla la visibilidad del diálogo



  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.loading = true;
    this.ventaService.listarVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar las ventas:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las ventas.',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  verDetalles(idVenta: number): void {
    this.loading = true;

    // Obtener la venta seleccionada
    this.ventaService.obtenerVenta(idVenta).subscribe({
      next: (venta) => {
        this.ventaSeleccionada = venta;

        // Obtener los detalles de la venta
        this.ventaService.listarDetalles(idVenta).subscribe({
          next: (detalles) => {
            this.detalles = detalles;
            this.mostrarDetalles = true; // Mostrar el diálogo
            this.loading = false;
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
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar la venta:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la venta seleccionada.',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }
}
