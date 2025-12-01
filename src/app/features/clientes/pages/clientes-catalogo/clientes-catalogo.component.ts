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
      // Si no hay categoría seleccionada, cargar todos los productos
      this.cargarProductos();
      return;
    }

    // Obtener productos filtrados desde el servicio
    this.productoService.getProductosPorCategoria(idCategoria).subscribe({
      next: (res) => {
        this.productos = res; // Actualizar productos con los filtrados
      },
      error: (err) => {
        console.error(`Error al cargar productos de la categoría ${idCategoria}:`, err);
        this.productos = []; // Vaciar productos en caso de error
      },
    });
  }
}
