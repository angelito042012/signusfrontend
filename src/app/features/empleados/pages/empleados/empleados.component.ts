import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { Empleado } from '../../../../core/models/Empleado';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
  providers: [MessageService],
})
export class EmpleadosComponent {
  private empleadoService = inject(EmpleadoService);
  private messageService = inject(MessageService);

  empleados: Empleado[] = [];
  loading = false;

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.loading = true; // Activar indicador de carga
    this.empleadoService.listarEmpleados().subscribe({
      next: (data) => {
        this.empleados = data; // Asignar los datos a la tabla
        this.loading = false; // Desactivar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los empleados:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los empleados.',
          life: 3000,
        });
        this.loading = false; // Desactivar indicador de carga
      },
    });
  }
}
