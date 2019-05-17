import React from "react";
import { IPedido } from "../../data/types";

export interface IPedidoClienteProps {
  pedido: Partial<IPedido>;
}

function PedidoCliente(props: IPedidoClienteProps) {
  const { pedido } = props;
  const fecha = new Date(Number(pedido.fecha));
  console.log(fecha);

  console.log(pedido);
  return (
    <div className="col-md-4">
      <div className={`card mb-3`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            Estado:
            <select className="form-control my-3" value={pedido.estado}>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="COMPLETADO">COMPLETADO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </p>
          <p className="card-text font-weight-bold">
            Pedido ID:
            <span className="font-weight-normal ml-2">{pedido.id}</span>
          </p>
          <p className="card-text font-weight-bold">
            Fecha Pedido:
            <span className="font-weight-normal ml-2">
              {fecha.toLocaleString("es-ES")}
            </span>
          </p>
          <p className="card-text font-weight-bold">
            Total:
            <span className="font-weight-normal ml-2">$ {pedido.total}</span>
          </p>

          <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
        </div>
      </div>
    </div>
  );
}

export default PedidoCliente;
