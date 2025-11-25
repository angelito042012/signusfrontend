import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../core/models/Producto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod'; //cambiar esto o nose we

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/productos';

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

}
