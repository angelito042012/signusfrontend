export interface CrearProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estado: boolean;
  categoria: {
    idCategoria: number;
  };
}
