import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MovimientoInventarioService } from '../../../../core/services/movimiento-inventario.service';
import { MovimientoInventario } from '../../../../core/models/MovimientoInventario';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimientos-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, CardModule, ButtonModule],
  templateUrl: './movimientos-inventario.component.html',
  styleUrl: './movimientos-inventario.component.css',
  providers: [MessageService],
})
export class MovimientosInventarioComponent implements OnInit {
  messageService = inject(MessageService);
  movimientoService = inject(MovimientoInventarioService);

  movimientos: MovimientoInventario[] = []; // Arreglo para almacenar los movimientos
  loading = false; // Estado de carga

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.loading = true; // Mostrar indicador de carga
    this.movimientoService.listarMovimientos().subscribe({
      next: (res) => {
        this.movimientos = res; // Asignar los datos a la tabla
        this.loading = false; // Ocultar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los movimientos de inventario:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los movimientos de inventario.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }
}
