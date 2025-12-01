import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MetodoPagoService } from '../../../../core/services/metodo-pago.service';
import { MetodoPago } from '../../../../core/models/MetodoPago';

@Component({
  selector: 'app-metodos-pago',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, FormsModule],
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.css',
  providers: [MessageService],
})
export class MetodosPagoComponent implements OnInit {
  metodoPagoService = inject(MetodoPagoService);
  messageService = inject(MessageService);

  metodosPago: MetodoPago[] = []; // Arreglo para almacenar los datos de la tabla
  loading = false; // Estado de carga

  ngOnInit(): void {
    this.cargarMetodosPago();
  }

  cargarMetodosPago(): void {
    this.loading = true; // Mostrar indicador de carga
    this.metodoPagoService.listarMetodosPago().subscribe({
      next: (res) => {
        this.metodosPago = res; // Asignar los datos a la tabla
        this.loading = false; // Ocultar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar los métodos de pago:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los métodos de pago.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }
}
