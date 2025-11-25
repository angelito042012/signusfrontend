export interface UsuarioCliente {
    idUsuario: number;
    email: string;
    contrasena: string;
    oauthProvider: string;
    oauthId: string;
    fechaRegistro: Date;
    estado: string;
}