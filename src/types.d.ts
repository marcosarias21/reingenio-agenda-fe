export interface Contacto {
  _id: string;
  nombre: string;
  apellido: string;
  provincia: string;
  telefono: number;
}

export interface ArgumentoContacto {
  nombre: string;
  apellido: string;
  provincia: string;
  telefono: number;
}
