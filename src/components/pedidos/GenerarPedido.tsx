import React from "react";
import { IProductosPedidos } from "../../data/types";
import { Mutation, MutationFn } from "react-apollo";
import { NUEVO_PEDIDO } from "../../data/mutations";
import { IPedidoProducto, IPedido } from "../../data/types";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface IGenerarPedidoProps extends RouteComponentProps {
  productos: IProductosPedidos[];
  total: number;
  clienteId: string;
}
const validarPedido = (props: IGenerarPedidoProps): boolean => {
  const { productos, total } = props;
  let noValido: boolean = !productos || total === 0;
  return noValido;
};

const handleOnClickGenerarPedido = (
  e: React.MouseEvent,
  nuevoPedido: MutationFn,
  props: IGenerarPedidoProps
) => {
  const input: IPedido = {
    cliente: props.clienteId,
    productos: props.productos.map(
      ({ nombre, precio, stock, ...resto }) => resto
    ),
    total: props.total,
    id: ""
  };
  nuevoPedido({
    variables: { input }
  });
};

const GenerarPedido = (props: IGenerarPedidoProps) => {
  return (
    <Mutation
      mutation={NUEVO_PEDIDO}
      onCompleted={() => props.history.push("/clientes")}
    >
      {(nuevoPedido: MutationFn) => (
        <button
          disabled={validarPedido(props)}
          type="button"
          className="btn btn-warning mt-4"
          onClick={e => handleOnClickGenerarPedido(e, nuevoPedido, props)}
        >
          Generar Pedido
        </button>
      )}
    </Mutation>
  );
};

export default withRouter(GenerarPedido);
