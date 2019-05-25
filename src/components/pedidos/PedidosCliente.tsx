import React from "react";
import { RouteComponentProps } from "react-router";
import { Query, QueryResult } from "react-apollo";
import { GET_PEDIDOS } from "../../data/queries";
import { IGetPedidos } from "../../data/types";
import Spinner from "../Spinner";
import PedidoCliente from "../pedidos/PedidoCliente";
import "./pedidos.css";

export interface IPedidosClienteProps
  extends RouteComponentProps<{ id: string }> {}
const PedidosCliente = (props: IPedidosClienteProps) => {
  const clienteId = props.match.params.id;
  return (
    <React.Fragment>
      <h1 className="text-center mb-5">Pedidos del Cliente</h1>
      <div className="row">
        <Query query={GET_PEDIDOS} variables={{ clienteId }} pollInterval={500}>
          {({
            loading,
            error,
            data,
            startPolling,
            stopPolling
          }: QueryResult<IGetPedidos>) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error.message}`;
            if (!data) return "";
            return data.getPedidos.map(pedido => (
              <PedidoCliente key={pedido.id} pedido={pedido} />
            ));
          }}
        </Query>
      </div>
    </React.Fragment>
  );
};
export default PedidosCliente;
