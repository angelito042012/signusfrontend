import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Empleado } from '../../../../core/models/Empleado';
import { AuthService } from '../../../../core/services/auth.service';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-empleados-home',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './empleados-home.component.html',
  styleUrl: './empleados-home.component.css',
  providers: [MessageService],
})
export class EmpleadosHomeComponent {
  empleadoActual: Empleado | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleadoActual();
  }

  cargarEmpleadoActual(): void {
    const decodedToken = this.authService.getDecoded();
    if (!decodedToken || !decodedToken.sub) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo obtener el email del usuario.',
        life: 3000,
      });
      return;
    }

    const email = decodedToken.sub; // Obtener el email del token
    this.empleadoService.obtenerEmpleadoPorUsuarioEmail(email).subscribe({
      next: (empleado) => {
        this.empleadoActual = empleado; // Asignar los datos del empleado actual
      },
      error: (err) => {
        console.error('Error al obtener el empleado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del empleado.',
          life: 3000,
        });
      },
    });
  }
}
