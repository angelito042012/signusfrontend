import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes-registro',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './clientes-registro.component.html',
  styleUrl: './clientes-registro.component.css',
  providers: [MessageService],
})
export class ClientesRegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  form = {
    email: '',
    password: '',
  };

  loading = false;
  error = '';

  async registrarCliente() {
    this.loading = true;
    this.error = '';

    // Validar que ambos campos estén rellenados
    if (!this.form.email || !this.form.password) {
      this.error = 'Por favor, completa todos los campos.';
      this.loading = false;
      return;
    }

    // Validar el formato del correo electrónico
    if (!this.validarEmail(this.form.email)) {
      this.error = 'El formato del correo electrónico no es válido.';
      this.loading = false;
      return;
    }

    // Validar la contraseña antes de enviar la solicitud
    if (!this.validarPassword(this.form.password)) {
      this.error =
        'La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula y 1 carácter especial.';
      this.loading = false;
      return;
    }

    try {
      const payload = {
        email: this.form.email,
        password: this.form.password,
      };

      await this.authService.registerCliente(payload);

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Cuenta creada',
        detail: 'Tu cuenta ha sido creada exitosamente.',
        life: 3000, // Mostrar el mensaje por 3 segundos
      });

      // Esperar antes de redirigir
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirigir al login
      }, 3000); // Esperar 3 segundos antes de redirigir
    } catch (err: any) {
      console.error('Error al registrar cliente:', err);

      // Manejar el error del backend
      if (
        err?.status === 400 &&
        err?.error === 'El email ya está registrado.'
      ) {
        this.error = 'El email ya está registrado. Por favor, utiliza otro.';
      } else {
        this.error =
          'Hubo un problema al registrar el cliente. Por favor, inténtalo nuevamente.';
      }
    } finally {
      this.loading = false;
    }
  }

  validarEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarPassword(password: string): boolean {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  }
}
