import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/Cliente';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  providers: [MessageService],
})
export class ClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private messageService = inject(MessageService);

  clientes: Cliente[] = [];
  loading = true;

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.loading = true; // Activar indicador de carga
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data; // Asignar los datos a la tabla
        this.loading = false; // Desactivar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los clientes:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los clientes.',
          life: 3000,
        });
        this.loading = false; // Desactivar indicador de carga
      },
    });
  }
}
