import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";

export interface Venta {
    idVenta: number;
    cliente?: Cliente;
    vendedor?: Empleado;
    metodoPago: string;
    fecha: Date;
    canal: string;
    total: number;
    estado: string;
}