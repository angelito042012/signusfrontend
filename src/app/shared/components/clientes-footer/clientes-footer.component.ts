import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-clientes-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientes-footer.component.html',
  styleUrl: './clientes-footer.component.css'
})
export class ClientesFooterComponent {
  authService = inject(AuthService);
  cerrarSesion(): void {
    this.authService.logout(); // Llama al método de cierre de sesión en el servicio de autenticación
  }
}
