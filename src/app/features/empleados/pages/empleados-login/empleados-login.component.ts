import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.loading = true;
    this.errorMsg = '';

    try {
      await this.auth.login('empleado', {
        email: this.email,
        password: this.password
      });

      console.log('TOKEN:', this.auth.getToken());
      console.log('ROLE:', this.auth.getRole());

      // redirige al dashboard del sistema
      this.router.navigateByUrl('/sistema');
    } catch (error: any) {
      this.errorMsg = 'Credenciales incorrectas';
      console.error(error);
    }

    this.loading = false;
  }
}
