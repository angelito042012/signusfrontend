import { OperacionInventario } from "./OperacionInventario";
import { Producto } from "./Producto";

export interface DetalleOperacionInventario {
    idDetalle: number;
    operacion?: OperacionInventario;
    producto?: Producto;
    cantidad: number;
}