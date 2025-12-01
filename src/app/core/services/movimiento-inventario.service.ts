import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoInventario } from '../models/MovimientoInventario';

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/movimientos-inventario';

  // Listar todos los movimientos de inventario
  listarMovimientos(): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(this.baseUrl);
  }

  // Obtener un movimiento de inventario por ID
  obtenerMovimientoPorId(idMovimiento: number): Observable<MovimientoInventario> {
    return this.http.get<MovimientoInventario>(`${this.baseUrl}/${idMovimiento}`);
  }

  // Crear un nuevo movimiento de inventario
  crearMovimiento(movimiento: MovimientoInventario): Observable<MovimientoInventario> {
    return this.http.post<MovimientoInventario>(this.baseUrl, movimiento);
  }

  // Actualizar un movimiento de inventario existente
  actualizarMovimiento(idMovimiento: number, movimiento: Partial<MovimientoInventario>): Observable<MovimientoInventario> {
    return this.http.put<MovimientoInventario>(`${this.baseUrl}/${idMovimiento}`, movimiento);
  }

  // Eliminar un movimiento de inventario
  eliminarMovimiento(idMovimiento: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idMovimiento}`);
  }

  // Listar movimientos de inventario por ID de producto
  listarMovimientosPorProducto(idProducto: number): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(`${this.baseUrl}/producto/${idProducto}`);
  }

  // Listar movimientos de inventario por ID de operación
  listarMovimientosPorOperacion(idOperacion: number): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(`${this.baseUrl}/operacion/${idOperacion}`);
  }

  // Listar movimientos de inventario por ID de empleado encargado
  listarMovimientosPorEncargado(idEmpleado: number): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(`${this.baseUrl}/encargado/${idEmpleado}`);
  }
}
