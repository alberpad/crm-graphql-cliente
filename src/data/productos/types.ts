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
