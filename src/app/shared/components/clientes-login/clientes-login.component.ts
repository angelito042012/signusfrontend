import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ClienteLoginRequest } from '../../../core/models/requests/ClienteAuthRequest';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-clientes-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './clientes-login.component.html',
  styleUrl: './clientes-login.component.css'
})
export class ClientesLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  loginData: ClienteLoginRequest = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  async login() {
    this.loading = true;
    this.error = '';

    // Validar que ambos campos estén rellenados
    if (!this.loginData.email || !this.loginData.password) {
      this.error = 'Por favor, completa todos los campos.';
      this.loading = false;
      return;
    }

    try {
      await this.auth.login('cliente', this.loginData);
      this.router.navigate(['/']);     // redirigir al home cliente
    } catch (e: any) {
      this.error = 'Credenciales incorrectas';
    } finally {
      this.loading = false;
    }
  }
}
