import { Categoria } from "./Categoria";

export interface Producto {
    idProducto: number;
    categoria?: Categoria;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    estado: string;
}