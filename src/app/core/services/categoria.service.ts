import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria } from '../models/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  // Listar todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // Obtener una categoría por ID
  getCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva categoría
  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // Actualizar una categoría existente
  actualizarCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener una categoría por nombre
  getCategoriaPorNombre(nombre: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/nombre/${nombre}`);
  }
}
