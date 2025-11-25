import { Carrito } from "./Carrito";
import { Producto } from "./Producto";

export interface CarritoDetalle {
    idDetalle: number;
    carrito?: Carrito;
    producto?: Producto;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}