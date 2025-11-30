import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ClienteRegisterRequest } from '../models/requests/ClienteAuthRequest';

type LoginRole = 'cliente' | 'empleado' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'token_signus';

  // Ajusta base según tu environment
  private base = `${environment.apiUrl}/auth`;

  // --------------------------
  // TOKEN STORAGE
  // --------------------------
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // --------------------------
  // TOKEN DECODE
  // --------------------------
  getDecoded(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getDecoded()?.role ?? null;
  }

  // --------------------------
  // EXPIRATION CHECK
  // --------------------------
  isTokenExpired(): boolean {
    const decoded = this.getDecoded();
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  isLogged(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  // --------------------------
  // LOGIN
  // --------------------------
  async login(
    role: LoginRole,
    payload: { email: string; password: string }
  ): Promise<void> {

    // EXAMPLE: /auth/login/empleado
    const url = `${this.base}/login/${role}`;

    const res: any = await firstValueFrom(
      this.http.post(url, payload)
    );

    if (res?.token) {
      this.setToken(res.token);
      return;
    }

    throw new Error('No se obtuvo un token del backend');
  }

  // --------------------------
  // REGISTRAR CLIENTE
  // --------------------------

  async registerCliente(payload: ClienteRegisterRequest): Promise<void> {
    const url = `${this.base}/register/cliente`;

    const res: any = await firstValueFrom(
      this.http.post(url, payload, { responseType: 'text' })
    );

    if (res.includes('Cliente registrado exitosamente')) {
      return; // Registro exitoso, no se necesita hacer nada más
    }

    throw new Error('No se obtuvo un token del backend');
  }



  // --------------------------
  // LOGOUT
  // --------------------------
  logout(redirect = '/') {
    this.removeToken();
    this.router.navigateByUrl(redirect);
    window.location.reload();
  }
}
