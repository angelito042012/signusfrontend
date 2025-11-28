import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/models/Cliente';
import { CarritoDetalle } from '../../../../core/models/CarritoDetalle';
import { Pedido } from '../../../../core/models/Pedido';
import { CarritoService } from '../../../../core/services/carrito.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PedidoService } from '../../../../core/services/pedido.service';
import { CompraOnlineService } from '../../../../core/services/compra-online.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    RadioButtonModule,
    ToastModule,
  ],
  templateUrl: './clientes-checkout.component.html',
  styleUrl: './clientes-checkout.component.css',
  providers: [MessageService],
})
export class ClientesCheckoutComponent implements OnInit {
  clienteService = inject(ClienteService);
  carritoService = inject(CarritoService);
  pedidoService = inject(PedidoService);
  compraService = inject(CompraOnlineService);
  auth = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  cliente?: Cliente;
  detalles: CarritoDetalle[] = [];
  total: number = 0;

  pedido!: Pedido; // Lo construiremos aquí

  // Propiedad para manejar los datos del formulario
  form = {
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    tipoEnvio: 'ESTANDAR', // Valor predeterminado
  };

  formPago = {
    nombre: '',
    apellido: '',
    numeroTarjeta: '',
    cvv: '',
    fechaVencimiento: '',
    metodo: 'TARJETA', // por defecto
  };

  async ngOnInit() {
    await this.loadCliente();
    await this.loadCarritoDetalles();
    this.buildPedido();
  }

  // -----------------------------
  // CARGAR CLIENTE DESDE EL TOKEN
  // -----------------------------
  async loadCliente() {
    const decoded = this.auth.getDecoded();
    if (!decoded?.sub) return;

    const email = decoded.sub;

    this.cliente = await this.clienteService
      .obtenerClientePorEmail(email)
      .toPromise();
  }

  // -----------------------------
  // CARGAR DETALLES DEL CARRITO
  // -----------------------------
  async loadCarritoDetalles() {
    await this.carritoService.loadCarritoFromUser();

    this.detalles = this.carritoService.detalles();
    this.total = this.detalles.reduce((t, d) => t + d.subtotal, 0);
  }

  // -----------------------------
  // CARGAR DATOS DEL CLIENTE EN EL FORM
  // -----------------------------
  cargarDatosCliente() {
    if (!this.cliente) return;

    this.form.nombres = this.cliente.nombres;
    this.form.apellidos = this.cliente.apellidos;
    this.form.dni = this.cliente.dni;
    this.form.telefono = this.cliente.telefono;

    this.form.direccion = this.cliente.direccion;
    this.form.departamento = this.cliente.departamento;
    this.form.provincia = this.cliente.provincia;
    this.form.distrito = this.cliente.distrito;
  }

  // -----------------------------
  // ARMAR EL PEDIDO PARA ENVIAR
  // -----------------------------
  buildPedido() {
    if (!this.cliente) return;

    const direccionCompleta =
      `${this.cliente.direccion}, ` +
      `${this.cliente.distrito}, ` +
      `${this.cliente.provincia}, ` +
      `${this.cliente.departamento}`;

    this.pedido = {
      idPedido: 0, // backend lo asignará
      fecha: new Date(),
      estado: 'PENDIENTE',
      direccionEnvio: direccionCompleta,
      codigoSeguimiento: '',
      tipoEnvio: 'DOMICILIO',
    };
  }

  // -----------------------------
  // ACCIÓN FINAL (AÚN SIN ENDPOINT)
  // -----------------------------
  async confirmarPedido() {
    if (!this.cliente) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo obtener la información del cliente.',
      });
      return;
    }

    try {
      // Construir dirección completa
      const direccionCompleta = `${this.form.direccion} - ${this.form.distrito} - ${this.form.provincia} - ${this.form.departamento}`;

      // Construir body del pedido
      const body = {
        idCliente: this.cliente.idCliente,
        metodoPago: this.formPago.metodo,
        direccionEnvio: direccionCompleta,
        tipoEnvio: this.form.tipoEnvio,
        productos: this.detalles.map((d) => ({
          idProducto: d.producto?.idProducto,
          cantidad: d.cantidad,
        })),
      };

      // 🔵 Enviar pedido (esperar resultado)
      const respuesta = await firstValueFrom(
        this.compraService.confirmarPedido(body)
      );
      console.log('Pedido confirmado:', respuesta);

      // 🟢 Mostrar éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Pedido Confirmado',
        detail: 'Su pedido fue registrado correctamente.',
        life: 3500,
      });

      // 🧹 Vaciar el carrito después del pedido
      await this.carritoService.limpiarCarrito();

      // 🔔 Toast informativo
      this.messageService.add({
        severity: 'info',
        summary: 'Carrito Actualizado',
        detail: 'Los productos fueron eliminados del carrito.',
        life: 2500,
      });

      // 🔄 Redirigir (opcional)
      setTimeout(() => {
        this.router.navigate(['/pedidos']);
      }, 1800);
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Error al Confirmar',
        detail: 'Ocurrió un problema y no se pudo registrar el pedido.',
        life: 3500,
      });
    }
  }
}
