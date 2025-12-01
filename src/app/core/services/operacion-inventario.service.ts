import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OperacionInventario } from '../models/OperacionInventario';
import { DetalleOperacionInventario } from '../models/DetalleOperacionInventario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperacionInventarioService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/operaciones-inventario';

  // Listar todas las operaciones de inventario
  listarOperaciones(): Observable<OperacionInventario[]> {
    return this.http.get<OperacionInventario[]>(this.baseUrl);
  }

  // Obtener una operación de inventario por ID
  obtenerOperacionPorId(idOperacion: number): Observable<OperacionInventario> {
    return this.http.get<OperacionInventario>(`${this.baseUrl}/${idOperacion}`);
  }

  // Actualizar una operación de inventario
  actualizarOperacion(idOperacion: number, operacion: Partial<OperacionInventario>): Observable<OperacionInventario> {
    return this.http.put<OperacionInventario>(`${this.baseUrl}/${idOperacion}`, operacion);
  }

  // Eliminar una operación de inventario
  eliminarOperacion(idOperacion: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idOperacion}`);
  }

  // Registrar operación de inventario con detalles
  registrarOperacionConDetalles(dto: Omit<OperacionInventario, 'idOperacion' | 'encargado'> & { detalles: DetalleOperacionInventario[] }): Observable<OperacionInventario> {
    return this.http.post<OperacionInventario>(`${this.baseUrl}/registrar`, dto);
  }

  // Obtener detalles de operación por ID de operación
  obtenerDetallesPorOperacion(idOperacion: number): Observable<DetalleOperacionInventario[]> {
    return this.http.get<DetalleOperacionInventario[]>(`${this.baseUrl}/operacion/${idOperacion}`);
  }

  // Listar todos los detalles de operación de inventario
  listarDetalles(): Observable<DetalleOperacionInventario[]> {
    return this.http.get<DetalleOperacionInventario[]>(`${this.baseUrl}/detalles`);
  }

  // Obtener un detalle de operación por ID
  obtenerDetallePorId(idDetalle: number): Observable<DetalleOperacionInventario> {
    return this.http.get<DetalleOperacionInventario>(`${this.baseUrl}/detalles/${idDetalle}`);
  }

  // Actualizar un detalle de operación de inventario
  actualizarDetalle(idDetalle: number, detalle: Partial<DetalleOperacionInventario>): Observable<DetalleOperacionInventario> {
    return this.http.put<DetalleOperacionInventario>(`${this.baseUrl}/detalles/${idDetalle}`, detalle);
  }

  // Eliminar un detalle de operación de inventario
  eliminarDetalle(idDetalle: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/detalles/${idDetalle}`);
  }

  // Crear un nuevo detalle de operación de inventario
  crearDetalle(idOperacion: number, detalle: DetalleOperacionInventario): Observable<DetalleOperacionInventario> {
    return this.http.post<DetalleOperacionInventario>(`${this.baseUrl}/${idOperacion}/detalles`, detalle);
  }
}
