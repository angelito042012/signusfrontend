export interface ClienteRegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface ClienteLoginRequest {
  email: string;
  password: string;
}
