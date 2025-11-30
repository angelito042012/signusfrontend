import { Component, inject, signal } from '@angular/core';
import { ClienteService } from '../../../../core/services/cliente.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Cliente } from '../../../../core/models/Cliente';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-clientes-perfil',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CardModule, FormsModule, ToastModule, ProgressSpinnerModule],
  templateUrl: './clientes-perfil.component.html',
  styleUrl: './clientes-perfil.component.css',
  providers: [MessageService],
})
export class ClientesPerfilComponent {
  private clienteService = inject(ClienteService);
  private auth = inject(AuthService);
  private messageService = inject(MessageService);

  cliente: Cliente = {
    idCliente: 0,
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: ''
  }; // Inicializar el cliente con valores vacíos
  loading = true;

  editMode = false; // Controla si los campos son editables
  originalCliente: Cliente | null = null; // Almacena una copia del cliente original para cancelar cambios

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente() {
    const email = this.auth.getDecoded()?.sub;

    if (!email) {
      this.loading = false; // Detener el loading si no hay email
      return;
    }

    this.clienteService.obtenerClientePorEmail(email).subscribe({
      next: (c) => {
        this.cliente = c; // Asignar directamente el cliente
        this.originalCliente = { ...c }; // Guardar una copia del cliente original
        this.loading = false; // Detener el loading después de cargar los datos
      },
      error: (err) => {
        console.error('Error cargando cliente:', err);
        this.loading = false; // Detener el loading en caso de error
      }
    });
  }

  //lo que hacia en gm basicamente

  habilitarEdicion() {
    this.editMode = true; // Habilitar edición
  }

  cancelarEdicion() {
    if (this.originalCliente) {
      this.cliente = { ...this.originalCliente }; // Restaurar los datos originales
    }
    this.editMode = false; // Deshabilitar edición
  }

  async actualizarCliente() {
    console.log('Cliente antes de actualizar:', this.cliente); // Depuración

    if (!this.cliente) return;

    this.loading = true;

    try {
      const clienteActualizado = await this.clienteService.actualizarCliente(this.cliente).toPromise();
      console.log('Cliente actualizado:', clienteActualizado); // Depuración

      this.messageService.add({
        severity: 'success',
        summary: 'Perfil Actualizado',
        detail: 'Tu información ha sido actualizada exitosamente.',
        life: 3000
      });

      // Volver a cargar los datos del cliente sin recargar la página
      //this.cargarCliente();

      await this.sleep(1200); // Pequeña espera para asegurar que los datos se hayan actualizado
      window.location.reload(); // Recargar la página para reflejar los cambios en el header signal
    } catch (err) {
      console.error('Error al actualizar cliente:', err);

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al actualizar tu información.',
        life: 3000
      });
    } finally {
      this.loading = false;
      this.editMode = false; // Deshabilitar edición después de guardar
    }
  }

  // Método para pausar la ejecución
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
