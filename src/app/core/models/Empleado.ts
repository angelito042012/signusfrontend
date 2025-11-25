import { UsuarioEmpleado } from "./UsuarioEmpleado";

export interface Empleado {
    idEmpleado: number;
    usuarioEmpleado?: UsuarioEmpleado;
    nombres: string;
    apellidos: string;
    dni: string;
    telefono: string;
    rol: string; // VENTAS | ALMACEN | PEDIDOS | ADMIN
}