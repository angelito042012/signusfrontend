import { Empleado } from "./Empleado";

export interface OperacionInventario {
    idOperacion: number;
    tipoOperacion: string;
    fecha: Date;
    encargado: Empleado;
    motivo: string;
}