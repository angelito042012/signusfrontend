import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DetalleVenta } from '../models/DetalleVenta';
import { Venta } from '../models/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/ventas';

  // --- Ventas ---
  listarVentas() {
    return this.http.get<Venta[]>(this.baseUrl);
  }

  obtenerVenta(idVenta: number) {
    return this.http.get<Venta>(`${this.baseUrl}/${idVenta}`);
  }

  registrarVentaFisica(venta: Omit<Venta, 'idVenta'>) {
    return this.http.post<Venta>(`${this.baseUrl}/registrar`, venta);
  }

  actualizarVenta(idVenta: number, venta: Partial<Venta>) {
    return this.http.put<Venta>(`${this.baseUrl}/${idVenta}`, venta);
  }

  eliminarVenta(idVenta: number) {
    return this.http.delete(`${this.baseUrl}/${idVenta}`);
  }

  // --- Detalles de venta ---
  listarDetalles(idVenta: number) {
    return this.http.get<DetalleVenta[]>(`${this.baseUrl}/${idVenta}/detalles`);
  }

  agregarDetalle(idVenta: number, detalle: DetalleVenta) {
    return this.http.post<DetalleVenta>(`${this.baseUrl}/${idVenta}/detalles`, detalle);
  }

  eliminarDetalle(idVenta: number, idDetalle: number) {
    return this.http.delete(`${this.baseUrl}/${idVenta}/detalles/${idDetalle}`);
  }
}
