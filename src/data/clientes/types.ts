export interface IGetClientes {
  getClientes: Partial<ICliente>[];
  totalClientes: number;
}
export interface IGetCliente {
  getCliente: Partial<ICliente>;
}
export interface ICliente {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  emails: { email: string }[];
  edad: number;
  tipo: TipoCliente;
  pedidos: IPedidoInput[];
}
enum TipoCliente {
  BASICO,
  PREMIUM
}
interface IPedidoInput {
  producto: string;
  precio: number;
}
