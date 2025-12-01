import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperacionInventarioService } from '../../../../core/services/operacion-inventario.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Producto } from '../../../../core/models/Producto';
import { ProductoService } from '../../../../core/services/producto.service';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-registrar-operacion-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableModule, ButtonModule, InputTextModule, SelectModule, CardModule, DialogModule, ToastModule],
  templateUrl: './registrar-operacion-inventario.component.html',
  styleUrl: './registrar-operacion-inventario.component.css',
  providers: [MessageService],
})
export class RegistrarOperacionInventarioComponent implements OnInit {
  operacionService = inject(OperacionInventarioService);
  empleadoService = inject(EmpleadoService);
  private productoService = inject(ProductoService);
  messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  operacionForm: FormGroup;
  productos: Producto[] = [];
  mostrarModalProductos: boolean = false;

  constructor() {
    this.operacionForm = this.fb.group({
      idEncargado: [null, Validators.required],
      tipoOperacion: ['', Validators.required],
      motivo: ['', Validators.required],
      detalles: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarIdEncargado();
    this.cargarProductos();
  }

  get detalles(): FormArray {
    return this.operacionForm.get('detalles') as FormArray;
  }

  cargarIdEncargado(): void {
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
        this.operacionForm.get('idEncargado')?.setValue(empleado.idEmpleado); // Asignar el ID del encargado al formulario
      },
      error: (err) => {
        console.error('Error al obtener el empleado:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener el ID del encargado.',
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
      productoId: [producto.idProducto, Validators.required],
      productoNombre: [producto.nombre, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });

    this.detalles.push(detalleForm); // Agregar el detalle al FormArray
    this.mostrarModalProductos = false; // Ocultar el modal
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  registrarOperacion(): void {
    if (this.detalles.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Debe agregar al menos un detalle a la operación.',
        life: 3000,
      });
      return;
    }

    if (!this.operacionForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Debe completar todos los campos requeridos.',
        life: 3000,
      });
      return;
    }

    // Construir el objeto esperado por el backend
    const dto = {
      idEncargado: this.operacionForm.get('idEncargado')?.value,
      tipoOperacion: this.operacionForm.get('tipoOperacion')?.value,
      motivo: this.operacionForm.get('motivo')?.value,
      detalles: this.detalles.value,
      fecha: new Date(), //aunque el endpoint lo genere, lo agrego para evitar errores de validacion
    };

    this.operacionService.registrarOperacionConDetalles(dto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La operación se registró correctamente.',
          life: 3000,
        });
        this.operacionForm.reset();
        this.detalles.clear();
      },
      error: (err) => {
        console.error('Error al registrar la operación:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la operación.',
          life: 3000,
        });
      },
    });
  }
}
