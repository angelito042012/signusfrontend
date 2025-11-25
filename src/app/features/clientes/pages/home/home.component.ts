import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto.service';
import { Producto } from '../../../../core/models/Producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private productoService = inject(ProductoService)

  productos: Producto[] = [];

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error(err)
    });
  }


}
