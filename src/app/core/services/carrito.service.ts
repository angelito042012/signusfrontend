import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { CarritoDetalle } from '../models/CarritoDetalle';
import { ClienteService } from './cliente.service';
import { firstValueFrom } from 'rxjs';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private clienteService = inject(ClienteService);

  private base = `${environment.apiUrl}/carritos`;

  // ---------------------------
  // SIGNALS
  // ---------------------------

  carrito = signal<Carrito | null>(null);

  carritoId = signal<number | null>(null);

  detalles = signal<CarritoDetalle[]>([]);

  // Computed totals
  totalItems = computed(() =>
    this.detalles().reduce((acc, d) => acc + d.cantidad, 0)
  );

  totalPrice = computed(() =>
    this.detalles().reduce((acc, d) => acc + d.subtotal, 0)
  );

  // ---------------------------
  // CARGAR CARRITO DEL CLIENTE
  // ---------------------------
  async loadCarritoFromUser() {
    console.log('Cargando carrito del usuario');

    const decoded = this.auth.getDecoded();
    if (!decoded?.sub) return;

    const email = decoded.sub;

    // 1️⃣ Obtener cliente por email
    const cliente = await firstValueFrom(
      this.clienteService.obtenerClientePorEmail(email)
    );

    if (!cliente?.idCliente) return;

    // 2️⃣ Obtener carrito del cliente
    const carrito: any = await firstValueFrom(
      this.http.get(`${this.base}/cliente/${cliente.idCliente}`)
    );

    this.carrito.set(carrito);

    this.carritoId.set(carrito.idCarrito);

    // 3️⃣ Cargar detalles
    await this.loadDetalles();
  }

  // ---------------------------
  // CARGAR DETALLES DEL CARRITO
  // ---------------------------
  async loadDetalles() {
    if (!this.carritoId()) return;

    const resp = await this.http
      .get<CarritoDetalle[]>(`${this.base}/${this.carritoId()}/detalles`)
      .toPromise();

    this.detalles.set(resp ?? []);
  }

  // ---------------------------
  // AGREGAR PRODUCTO
  // ---------------------------
  async addProducto(idProducto: number, cantidad = 1) {
    if (!this.carritoId()) {
      await this.loadCarritoFromUser();
    }

    await this.http
      .post(`${this.base}/${this.carritoId()}/detalles`, null, {
        params: {
          idProducto: idProducto,
          cantidad: cantidad,
        },
      })
      .toPromise();

    await this.loadDetalles();
  }

  // ---------------------------
  // ACTUALIZAR CANTIDAD
  // ---------------------------
  async updateCantidad(idDetalle: number, cantidad: number) {
    if (!this.carritoId()) return;

    await this.http
      .put(`${this.base}/${this.carritoId()}/detalles/${idDetalle}`, null, {
        params: {
          cantidad: cantidad,
        },
      })
      .toPromise();

    await this.loadDetalles();
  }

  // ---------------------------
  // ELIMINAR PRODUCTO
  // ---------------------------
  async deleteDetalle(idDetalle: number) {
    if (!this.carritoId()) return;

    await this.http
      .delete(`${this.base}/${this.carritoId()}/detalles/${idDetalle}`)
      .toPromise();

    await this.loadDetalles();
  }

}
