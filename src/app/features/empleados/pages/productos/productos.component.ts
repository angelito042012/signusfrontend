import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../core/services/producto.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Producto } from '../../../../core/models/Producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [MessageService],
})
export class ProductosComponent {
  private productoService = inject(ProductoService);
  private messageService = inject(MessageService)

  productos: Producto[] = [];
  loading = true;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al cargar productos'});
        this.loading = false;
      }
    });
  }
}
