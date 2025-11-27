import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { MetodoPago } from "./MetodoPago";

export interface Venta {
    idVenta: number;
    cliente?: Cliente;
    vendedor?: Empleado;
    metodoPago?: MetodoPago;
    fecha: Date;
    canal: string;
    total: number;
    estado: string;
}
