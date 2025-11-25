import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaFiltroComponent } from '../../components/categoria-filtro/categoria-filtro.component';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';

import { CategoriaService } from '../../../../core/services/categoria.service';
import { ProductoService } from '../../../../core/services/producto.service';

import { Categoria } from '../../../../core/models/Categoria';
import { Producto } from '../../../../core/models/Producto';
@Component({
  selector: 'app-clientes-catalogo',
  standalone: true,
  imports: [CommonModule, CategoriaFiltroComponent, ListaProductosComponent],
  templateUrl: './clientes-catalogo.component.html',
  styleUrl: './clientes-catalogo.component.css'
})
export class ClientesCatalogoComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private productoService = inject(ProductoService);

  categorias: Categoria[] = [];
  productos: Producto[] = [];
  categoriaSeleccionada: number | null = null;

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(res => this.categorias = res);
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(res => this.productos = res);
  }

  filtrarPorCategoria(idCategoria: number | null) {
    this.categoriaSeleccionada = idCategoria;

    if (!idCategoria) {
      this.cargarProductos();
      return;
    }

    this.productos = this.productos.filter(p => p.categoria?.idCategoria === idCategoria);
  }
}
