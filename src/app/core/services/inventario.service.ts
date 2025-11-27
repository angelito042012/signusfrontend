import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Inventario } from '../models/Inventario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/inventario';

  // GET /api/inventario
  getInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.baseUrl);
  }

  // GET /api/inventario/{idInventario}
  getInventarioById(idInventario: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseUrl}/${idInventario}`);
  }

  // POST /api/inventario
  crearInventario(data: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.baseUrl, data);
  }

  // PUT /api/inventario/{idInventario}
  actualizarInventario(idInventario: number, data: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.baseUrl}/${idInventario}`, data);
  }

  // DELETE /api/inventario/{idInventario}
  eliminarInventario(idInventario: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idInventario}`);
  }

  // GET /api/inventario/producto/{idProducto}
  getInventarioByProducto(idProducto: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseUrl}/producto/${idProducto}`);
  }
}
