import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../../core/services/producto.service';
import { Producto } from '../../../../core/models/Producto';

import { Card, CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { CarritoService } from '../../../../core/services/carrito.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-clientes-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, ToastModule],
  templateUrl: './clientes-home.component.html',
  styleUrl: './clientes-home.component.css',
  providers: [ProductoService, MessageService],
})
export class ClientesHomeComponent implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private messageService = inject(MessageService);
  private auth = inject(AuthService);

  productos: Producto[] = [];

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => console.error(err),
    });
  }

  async agregarAlCarrito(idProducto: number) {
    //verificar si el usuario esta autenticadoo

    const isLogged = this.auth.isLogged();
    if (!isLogged) {
      // Mostrar mensaje de advertencia
      this.messageService.add({
        severity: 'warn',
        summary: 'Debe iniciar sesión',
        detail: 'Inicie sesión para agregar productos al carrito',
        life: 2000,
      });
      return; // Detener la ejecución si no está autenticado
    }

    try {
      await this.carritoService.addProducto(idProducto, 1);

      // Mostrar toast
      this.messageService.add({
        severity: 'success',
        summary: 'Producto agregado',
        detail: 'Se añadió al carrito correctamente',
        life: 1500,
      });

    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo agregar al carrito',
        life: 1500,
      });
    }
  }
}
