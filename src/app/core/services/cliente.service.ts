import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/clientes';

  // --- Clientes ---
  listarClientes() {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  // --- Obtener cliente por Email ---
  obtenerClientePorEmail(email: string) {
    return this.http.get<Cliente>(`${this.baseUrl}/email/${email}`);
  }
}
