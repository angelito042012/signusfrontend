import { UsuarioCliente } from "./UsuarioCliente";

export interface Cliente {
    idCliente: number;
    usuarioCliente?: UsuarioCliente;
    nombres: string;
    apellidos: string;
    dni: string;
    telefono: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
}