import { Component, inject, signal } from '@angular/core';
import { ClienteService } from '../../../../core/services/cliente.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Cliente } from '../../../../core/models/Cliente';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-clientes-perfil',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './clientes-perfil.component.html',
  styleUrl: './clientes-perfil.component.css'
})
export class ClientesPerfilComponent {
  private clienteService = inject(ClienteService);
  private auth = inject(AuthService);

  cliente = signal<Cliente | null>(null); //nose porque le puso signal

  ngOnInit() {
    const email = this.auth.getDecoded()?.sub;

    if (!email) return;

    this.clienteService.obtenerClientePorEmail(email).subscribe({
      next: (c) => {
        this.cliente.set(c);
      },
      error: (err) => console.error('Error cargando cliente:', err)
    });
  }
}
