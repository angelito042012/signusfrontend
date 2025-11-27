import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  getCategorias() {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
