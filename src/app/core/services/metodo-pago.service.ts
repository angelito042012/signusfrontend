import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/MetodoPago';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/metodos-pago';

  // Obtener todos los métodos de pago
  listarMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.baseUrl);
  }

  // Obtener un método de pago por ID
  obtenerMetodoPagoPorId(idMetodo: string): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.baseUrl}/${idMetodo}`);
  }

  // Crear un nuevo método de pago
  crearMetodoPago(metodoPago: MetodoPago): Observable<MetodoPago> {
    return this.http.post<MetodoPago>(this.baseUrl, metodoPago);
  }

  // Actualizar un método de pago existente
  actualizarMetodoPago(idMetodo: string, metodoPago: Partial<MetodoPago>): Observable<MetodoPago> {
    return this.http.put<MetodoPago>(`${this.baseUrl}/${idMetodo}`, metodoPago);
  }

  // Eliminar un método de pago
  eliminarMetodoPago(idMetodo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idMetodo}`);
  }

  // Obtener un método de pago por nombre
  obtenerMetodoPagoPorNombre(nombre: string): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.baseUrl}/nombre/${nombre}`);
  }
}
