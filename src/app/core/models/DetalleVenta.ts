import { Producto } from "./Producto";
import { Venta } from "./Venta";

export interface DetalleVenta {
    idDetalleVenta: number;
    venta?: Venta;
    producto?: Producto;
    cantidad: number;
    precioUnitario: number;
    
}