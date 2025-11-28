import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { DetalleVenta } from '../models/DetalleVenta';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/pedidos';

  // ---------------------------------------------------------
  // GET: Obtener un pedido por ID
  // ---------------------------------------------------------
  obtenerPedido(idPedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${idPedido}`);
  }

  // ---------------------------------------------------------
  // PUT: Modificar un pedido
  // ---------------------------------------------------------
  actualizarPedido(idPedido: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${idPedido}`, pedido);
  }

  // ---------------------------------------------------------
  // DELETE: Eliminar pedido
  // ---------------------------------------------------------
  eliminarPedido(idPedido: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPedido}`);
  }

  // ---------------------------------------------------------
  // POST: Crear pedido desde una venta
  // ---------------------------------------------------------
  crearPedidoDesdeVenta(data: any): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/crear-desde-venta`, data);
  }

  // ---------------------------------------------------------
  // PATCH: Modificar estado (ej: PENDIENTE → EN CAMINO)
  // ---------------------------------------------------------
  actualizarEstado(idPedido: number, estado: string): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${idPedido}/estado`,
      { estado }
    );
  }

  // ---------------------------------------------------------
  // GET: Listar todos
  // ---------------------------------------------------------
  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}`);
  }

  // ---------------------------------------------------------
  // GET: Filtrar por estado
  // ---------------------------------------------------------
  listarPorEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/estado/${estado}`);
  }

  // ---------------------------------------------------------
  // GET: Listar por email de cliente
  // ---------------------------------------------------------
  listarPorEmail(email: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/email/${email}`);
  }


  // ---------------------------------------------------------
  // POST: Obtener detalles de venta segun id de pedido
  // ---------------------------------------------------------
  listarDetallesPedido(idPedido: number): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(`${this.baseUrl}/${idPedido}/venta/detalles`);
  }
}
