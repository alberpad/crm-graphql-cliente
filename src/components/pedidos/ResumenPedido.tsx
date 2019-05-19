import React from "react";
import { IProducto } from "../../data/types";
import LineaProducto from "./LineaProducto";

export interface IResumenPedidoProps {
  productos: IProducto[];
  actualizarCantidad: (cantidad: number, index: number) => void;
  eliminarProducto: (id: string) => void;
}

const ResumenPedido = (props: IResumenPedidoProps) => {
  const { productos } = props;

  if (productos.length === 0) return null;
  return (
    <React.Fragment>
      <h2 className="text-center my-5">Resumen y Cantidades</h2>
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight-bold">
            <th>Producto</th>
            <th className="text-right">Precio</th>
            <th className="text-center">Inventario</th>
            <th className="text-center">Cantidad</th>
            <th className="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <LineaProducto
              key={producto.id}
              id={producto.id}
              producto={producto}
              index={index}
              actualizarCantidad={props.actualizarCantidad}
              eliminarProducto={props.eliminarProducto}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ResumenPedido;
