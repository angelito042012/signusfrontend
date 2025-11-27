import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../core/services/producto.service';
import { Producto } from '../../../../core/models/Producto';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Inventario } from '../../../../core/models/Inventario';
import { InventarioService } from '../../../../core/services/inventario.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, Card, Button],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private inventarioService = inject(InventarioService);

  producto?: Producto;

  inventario?: Inventario;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.getProductoById(id).subscribe({
      next: (p) => {
        this.producto = p;
        this.inventarioService.getInventarioByProducto(p.idProducto).subscribe({
          next: (inv) => (this.inventario = inv),
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });
  }
}
