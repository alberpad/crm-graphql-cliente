export interface IGetClientes {
  getClientes: Partial<ICliente>[];
  totalClientes: number;
}
export interface IGetCliente {
  getCliente: Partial<ICliente>;
}
export interface ICliente {
  id: string;
  idVendedor: string;
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

export interface IGetProductos {
  getProductos: Partial<IProducto>[];
  totalProductos: number;
}
export interface IGetProducto {
  getProducto: Partial<IProducto>;
}
export interface IProducto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

export interface IUsuario {
  usuario: string;
  password: string;
  nombre: string;
  rol: string;
}

export interface IProductosPedidos extends IProducto {
  cantidad: number;
}

export interface IPedido {
  id: string;
  productos: IPedidoProducto[];
  total: number;
  cliente: string;
  estado?: string;
  fecha?: Date;
  idVendedor: string;
}
export interface IGetPedidos {
  getPedidos: Partial<IPedido>[];
}

export interface IPedidoProducto {
  id: string;
  cantidad: number;
}

export interface IMejorCliente {
  total: number;
  cliente: ICliente[];
}

export interface ITopClientes {
  topClientes: IMejorCliente[];
}

export interface IMejorVendedor {
  total: number;
  vendedor: IUsuario[];
}

export interface ITopVendedores {
  topVendedores: IMejorVendedor[];
}

export interface IDataAutenticar {
  autenticarUsuario: {
    token: string;
  };
}

export interface IGetUsuario {
  getUsuario: {
    id: string;
    usuario: string;
    nombre: string;
    rol: string;
  };
}
