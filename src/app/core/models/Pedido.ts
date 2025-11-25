import { Venta } from "./Venta";

export interface Pedido {
    idPedido: number;
    venta?: Venta;
    fecha: Date;
    estado: string;
    direccionEnvio: string;
    codigoSeguimiento: string;
    tipoEnvio: string;
}