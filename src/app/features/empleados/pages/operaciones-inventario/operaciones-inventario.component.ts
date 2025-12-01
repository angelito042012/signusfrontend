import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { OperacionInventarioService } from '../../../../core/services/operacion-inventario.service';
import { OperacionInventario } from '../../../../core/models/OperacionInventario';
import { DetalleOperacionInventario } from '../../../../core/models/DetalleOperacionInventario';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-operaciones-inventario',
  imports: [CommonModule, CardModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './operaciones-inventario.component.html',
  styleUrl: './operaciones-inventario.component.css',
  standalone: true,
  providers: [MessageService]
})
export class OperacionesInventarioComponent implements OnInit {
  messageService = inject(MessageService);
  operacionService = inject(OperacionInventarioService);

  operaciones: OperacionInventario[] = []; // Arreglo para almacenar las operaciones
  loading = false; // Estado de carga

  detalles: DetalleOperacionInventario[] = []; // Arreglo para almacenar los detalles de una operación seleccionada
  operacionSeleccionada: OperacionInventario | null = null; // Operación seleccionada
  mostrarDetalles = false; // Controla la visibilidad de los detalles

  ngOnInit(): void {
    this.cargarOperaciones();
  }

  cargarOperaciones(): void {
    this.loading = true; // Mostrar indicador de carga
    this.operacionService.listarOperaciones().subscribe({
      next: (res) => {
        this.operaciones = res; // Asignar los datos a la tabla
        this.loading = false; // Ocultar indicador de carga
        console.log('Operaciones de inventario cargadas:', res);
      },
      error: (err) => {
        console.error('Error al cargar las operaciones de inventario:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las operaciones de inventario.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }

  verDetalles(idOperacion: number): void {
    this.loading = true; // Mostrar indicador de carga

    // Obtener la operación por ID
    this.operacionService.obtenerOperacionPorId(idOperacion).subscribe({
      next: (operacion) => {
        this.operacionSeleccionada = operacion; // Asignar la operación seleccionada

        // Obtener los detalles de la operación
        this.operacionService.obtenerDetallesPorOperacion(idOperacion).subscribe({
          next: (detalles) => {
            this.detalles = detalles; // Asignar los detalles
            this.mostrarDetalles = true; // Mostrar el modal
            this.loading = false; // Ocultar indicador de carga
          },
          error: (err) => {
            console.error('Error al cargar los detalles de la operación:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron cargar los detalles de la operación.',
              life: 3000,
            });
            this.loading = false; // Ocultar indicador de carga
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar la operación:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la operación seleccionada.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }
}
