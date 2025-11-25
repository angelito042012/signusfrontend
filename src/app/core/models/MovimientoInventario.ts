import { Empleado } from "./Empleado";
import { OperacionInventario } from "./OperacionInventario";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

export interface MovimientoInventario {
    idMovimiento: number;
    encargado?: Empleado;
    producto?: Producto;
    operacion?: OperacionInventario;
    venta?: Venta;
    tipoMovimiento: string;
    cantidad: number;
    stockAnterior: number;
    stockNuevo: number;
    fechaMovimiento: Date;
    motivo: string;
}