import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../core/models/Producto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; //cambiar esto o nose we
import { CrearProductoRequest } from '../models/requests/CrearProductoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/productos';

  // Crear un nuevo producto
  crearProducto(producto: CrearProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/crear`, producto);
  }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  // Obtener un producto por ID
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un producto existente
  actualizarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/${id}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Listar productos por categoría
  getProductosPorCategoria(idCategoria: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/categoria/${idCategoria}`);
  }

}
