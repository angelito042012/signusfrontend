import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/Cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, TableModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  loading = true;

  ngOnInit() {
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
