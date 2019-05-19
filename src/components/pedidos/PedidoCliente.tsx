import React from "react";
import { IPedido, IGetProducto } from "../../data/types";
import { GET_PRODUCTO } from "../../data/queries";
import { Query, QueryResult, Mutation, MutationFn } from "react-apollo";
import Spinner from "../Spinner";
import ResumenProducto from "./ResumenProducto";
import { ACTUALIZAR_PEDIDO } from "../../data/mutations";

export interface IPedidoClienteProps {
  pedido: Partial<IPedido>;
}

function PedidoCliente(props: IPedidoClienteProps) {
  const { pedido } = props;
  const fecha = new Date(Number(pedido.fecha));
  const { estado } = pedido;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    pedido: Partial<IPedido>,
    actualizarPedido: MutationFn
  ) => {
    const input: Partial<IPedido> = {
      id: pedido.id,
      estado: e.currentTarget.value,
      productos: pedido.productos,
      cliente: pedido.cliente,
      fecha: pedido.fecha,
      total: pedido.total
    };
    console.log(input);
    actualizarPedido({ variables: { input } });
  };

  let clase: string;
  if (estado === "PENDIENTE") {
    clase = "bg-danger";
  } else if (estado === "CANCELADO") {
    clase = "bg-light";
  } else {
    clase = "bg-success";
  }

  return (
    <div className="col-md-4">
      <div className={`card mb-3`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            Estado:
            <Mutation mutation={ACTUALIZAR_PEDIDO}>
              {(actualizarPedido: MutationFn) => (
                <select
                  className={`form-control my-3 ${clase}`}
                  value={pedido.estado}
                  onChange={e => handleOnChange(e, pedido, actualizarPedido)}
                >
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="COMPLETADO">COMPLETADO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              )}
            </Mutation>
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
          {pedido.productos &&
            pedido.productos.map((producto, index) => {
              const { id } = producto;
              return (
                <Query key={index} query={GET_PRODUCTO} variables={{ id }}>
                  {({ loading, error, data }: QueryResult<IGetProducto>) => {
                    if (loading) return <Spinner />;
                    if (error) return `Error ${error.message}`;
                    if (!data) return "";
                    return (
                      <ResumenProducto
                        producto={data.getProducto}
                        cantidad={producto.cantidad}
                        key={producto.id}
                      />
                    );
                  }}
                </Query>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PedidoCliente;
