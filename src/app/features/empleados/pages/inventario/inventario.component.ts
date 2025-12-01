import { Component, inject } from '@angular/core';
import { InventarioService } from '../../../../core/services/inventario.service';
import { MessageService } from 'primeng/api';
import { Inventario } from '../../../../core/models/Inventario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  providers: [MessageService],
})
export class InventarioComponent {
  inventarioService = inject(InventarioService);
  messageService = inject(MessageService);

  inventarios: Inventario[] = []; // Arreglo para almacenar los datos de inventarios
  loading = false; // Estado de carga

  ngOnInit(): void {
    this.cargarInventarios();
  }

  cargarInventarios(): void {
    this.loading = true; // Mostrar indicador de carga
    this.inventarioService.getInventarios().subscribe({
      next: (res) => {
        this.inventarios = res; // Asignar los datos a la tabla
        this.loading = false; // Ocultar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los inventarios:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los inventarios.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }
}
