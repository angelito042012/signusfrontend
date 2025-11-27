import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
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
      await this.auth.login('admin', {
        email: this.email,
        password: this.password
      });

      console.log('TOKEN:', this.auth.getToken());
      console.log('ROLE:', this.auth.getRole());

      this.router.navigateByUrl('/sistema'); // Ruta que tú definas
    } catch (err) {
      this.errorMsg = 'Credenciales incorrectas';
      console.error(err);
    }

    this.loading = false;
  }
}
