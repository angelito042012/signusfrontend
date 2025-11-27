import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { VentaService } from '../../../../core/services/venta.service';
import { Venta } from '../../../../core/models/Venta';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  private ventaService = inject(VentaService);

  ventas: Venta[] = [];

  loading = true;

  ngOnInit() {
    this.ventaService.listarVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


}
