import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-empleados-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardModule, ButtonModule, InputTextModule],
  templateUrl: './empleados-login.component.html',
  styleUrl: './empleados-login.component.css'
})
export class EmpleadosLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  async login() {
    // Validar que ambos campos estén llenados
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMsg = 'Por favor, complete todos los campos.';
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMsg = 'Por favor, ingrese un correo válido.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    try {
      // Llamada al servicio de autenticación
      await this.auth.login('empleado', {
        email: this.email,
        password: this.password,
      });

      console.log('TOKEN:', this.auth.getToken());
      console.log('ROLE:', this.auth.getRole());

      // Redirige al dashboard del sistema
      this.router.navigateByUrl('/sistema');
    } catch (error: any) {
      this.errorMsg = 'Credenciales incorrectas';
      console.error(error);
    }

    this.loading = false;
  }
}
