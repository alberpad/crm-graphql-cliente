import React from "react";
import { IProducto } from "../../data/types";

export interface IResumenProductoProps {
  producto: Partial<IProducto>;
  cantidad: number;
}

const ResumenProducto = (props: IResumenProductoProps) => {
  const { producto, cantidad } = props;
  if (!producto)
    return (
      <div>
        <p>Producto No Disponible</p>
      </div>
    );
  return (
    <React.Fragment>
      <div className="contenedor-productos mb-4 p-4">
        <p className="card-text font-weight-bold">
          Nombre del Producto:
          <span className="font-weight-normal">{producto.nombre}</span>
        </p>
        <p className="card-text font-weight-bold">
          Cantidad:
          <span className="font-weight-normal">{cantidad}</span>
        </p>
        <p className="card-text font-weight-bold">
          Precio:
          <span className="font-weight-normal">$ {producto.precio}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default ResumenProducto;
