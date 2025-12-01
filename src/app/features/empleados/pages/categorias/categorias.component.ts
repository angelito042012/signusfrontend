import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { Categoria } from '../../../../core/models/Categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  providers: [MessageService],
})
export class CategoriasComponent implements OnInit {
  categoriaService = inject(CategoriaService);
  messageService = inject(MessageService);

  categorias: Categoria[] = []; // Arreglo para almacenar las categorías
  loading = false; // Estado de carga

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.loading = true; // Mostrar indicador de carga
    this.categoriaService.getCategorias().subscribe({
      next: (res) => {
        this.categorias = res; // Asignar los datos a la tabla
        this.loading = false; // Ocultar indicador de carga
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías.',
          life: 3000,
        });
        this.loading = false; // Ocultar indicador de carga
      },
    });
  }
}
