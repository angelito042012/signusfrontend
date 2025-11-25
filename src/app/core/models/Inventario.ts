import { Producto } from "./Producto";

export interface Inventario {
    idInventario: number;
    producto: Producto;
    stockActual: number;
    stockMinimo: number;
    stockMaximo: number;
    ubicacion: string;
}