import gql from "graphql-tag";

export const GET_CLIENTES = gql`
  {
    getClientes {
      id
      nombre
      apellido
      empresa
    }
  }
`;
export interface IGetClientes {
  getClientes: Partial<ICliente>[];
}
export interface ICliente {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  emails: string[];
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
