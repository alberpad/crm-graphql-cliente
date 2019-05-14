import { IProducto } from "../productos/types";

export interface IProductosPedidos extends IProducto {
  cantidad: number;
}
