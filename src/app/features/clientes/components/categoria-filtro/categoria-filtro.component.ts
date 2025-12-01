import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../../core/models/Categoria';

@Component({
  selector: 'app-categoria-filtro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-filtro.component.html',
  styleUrl: './categoria-filtro.component.css'
})
export class CategoriaFiltroComponent {
  @Input() categorias: Categoria[] = [];
  @Output() categoriaSeleccionada = new EventEmitter<number | null>();

  categoriaSeleccionadaId: number | null = null; // Estado local para la categoría seleccionada

  seleccionarCategoria(idCategoria: number | null): void {
    this.categoriaSeleccionadaId = idCategoria; // Actualizar el estado local
    this.categoriaSeleccionada.emit(idCategoria); // Emitir el evento al padre
  }
}
