import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VentaService } from '../../../../core/services/venta.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MetodoPagoService } from '../../../../core/services/metodo-pago.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { MetodoPago } from '../../../../core/models/MetodoPago';
import { Producto } from '../../../../core/models/Producto';
import { DetalleVenta } from '../../../../core/models/DetalleVenta';
import { Select, SelectModule } from "primeng/select";
import { AuthService } from '../../../../core/services/auth.service';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-registrar-venta-fisica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, FormsModule, SelectModule, DialogModule, ToastModule, InputTextModule],
  templateUrl: './registrar-venta-fisica.component.html',
  styleUrl: './registrar-venta-fisica.component.css',
  providers: [MessageService],
})
export class RegistrarVentaFisicaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ventaService = inject(VentaService);
  private metodoPagoService = inject(MetodoPagoService);
  private productoService = inject(ProductoService);
  private messageService = inject(MessageService);
  private empleadoService = inject(EmpleadoService);
  auth = inject(AuthService);

  ventaForm: FormGroup;
  metodosPago: MetodoPago[] = [];
  productos: Producto[] = [];
  mostrarModalProductos: boolean = false;
  productoSeleccionado: Producto | null = null;

  constructor() {
    this.ventaForm = this.fb.group({
      idVendedor: [null, Validators.required],
      idMetodoPago: [null, Validators.required],
      canal: ['FISICA', Validators.required],
      total: [0, [Validators.required, Validators.min(0.01)]],
      detalles: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarMetodosPago();
    this.cargarProductos();
    this.cargarIdVendedor();
  }

  get detalles(): FormArray {
    return this.ventaForm.get('detalles') as FormArray;
  }

  cargarIdVendedor(): void {
    const decodedToken = this.auth.getDecoded();
    if (!decodedToken || !decodedToken.sub) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo obtener el email del usuario.',
        life: 3000,
      });
      return;
    }

    const email = decodedToken.sub; // Obtener el email del token
    this.empleadoService.obtenerEmpleadoPorUsuarioEmail(email).subscribe({
      next: (empleado) => {
        this.ventaForm.get('idVendedor')?.setValue(empleado.idEmpleado); // Asignar el ID del vendedor al formulario
      },
      error: (err) => {
        console.error('Error al obtener el empleado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener el ID del vendedor.',
          life: 3000,
        });
      },
    });
  }

  cargarMetodosPago(): void {
    this.metodoPagoService.listarMetodosPago().subscribe({
      next: (data) => {
        this.metodosPago = data;
      },
      error: (err) => {
        console.error('Error al cargar los métodos de pago:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los métodos de pago.',
          life: 3000,
        });
      },
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos.',
          life: 3000,
        });
      },
    });
  }

  agregarDetalle(): void {
    this.mostrarModalProductos = true; // Mostrar el modal para seleccionar un producto
  }

  seleccionarProducto(producto: Producto): void {
    const detalleForm = this.fb.group({
      idProducto: [producto.idProducto, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [producto.precio, Validators.required],
    });

    this.detalles.push(detalleForm); // Agregar el detalle al FormArray
    this.mostrarModalProductos = false; // Ocultar el modal
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  calcularTotal(): void {
    const total = this.detalles.controls.reduce((acc, detalle) => {
      const cantidad = detalle.get('cantidad')?.value || 0;
      const precioUnitario = detalle.get('precioUnitario')?.value || 0;
      return acc + cantidad * precioUnitario;
    }, 0);

    this.ventaForm.get('total')?.setValue(total);
    this.messageService.add({
      severity: 'info',
      summary: 'Total Calculado',
      detail: `El total de la venta es S/. ${total.toFixed(2)}`,
      life: 3000,
    });
  }

  registrarVenta(): void {
    this.calcularTotal();

    if (this.detalles.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Debe agregar al menos un detalle a la venta.',
        life: 3000,
      });
      return;
    }

    if (!this.ventaForm.get('idMetodoPago')?.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Debe seleccionar un método de pago.',
        life: 3000,
      });
      return;
    }

    const venta = {
      idVendedor: this.ventaForm.get('idVendedor')?.value,
      idMetodoPago: this.ventaForm.get('idMetodoPago')?.value.idMetodoPago, // Enviar solo el ID
      canal: this.ventaForm.get('canal')?.value,
      total: this.ventaForm.get('total')?.value,
      detalles: this.detalles.value,
      fecha: new Date(),
      estado: 'COMPLETADA',
    };

    this.ventaService.registrarVentaFisica(venta).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La venta se registró correctamente.',
          life: 3000,
        });
        this.ventaForm.reset();
        this.detalles.clear();
        this.ventaForm.get('total')?.setValue(0); // Reiniciar el total
      },
      error: (err) => {
        console.error('Error al registrar la venta:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la venta.',
          life: 3000,
        });
      },
    });
  }
}
