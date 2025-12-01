import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Empleado } from '../models/Empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/empleados';

  // Listar todos los empleados
  listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseUrl);
  }

  // Registrar un nuevo empleado
  registrarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.baseUrl, empleado);
  }

  // Actualizar un empleado existente
  actualizarEmpleado(idEmpleado: number, empleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.baseUrl}/${idEmpleado}`, empleado);
  }

  // Eliminar un empleado
  eliminarEmpleado(idEmpleado: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idEmpleado}`);
  }

  // Obtener un empleado por ID de usuario
  obtenerEmpleadoPorUsuario(idUsuario: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  // Obtener un empleado por email de usuario
  obtenerEmpleadoPorUsuarioEmail(email: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/email/${email}`);
  }
}
