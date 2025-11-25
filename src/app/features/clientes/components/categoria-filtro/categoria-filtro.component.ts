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
}
