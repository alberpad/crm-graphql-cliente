import React from "react";
import { RouteComponentProps } from "react-router";
import { DatosCliente } from "../clientes/DatosCliente";
import withProductos from "../hoc/withProductos";
import { IProducto } from "../../data/productos/types";
import ContenidoPedido from "./ContenidoPedido";

export interface INuevoPedidoProps extends RouteComponentProps<{ id: string }> {
  productos: IProducto[];
}

export interface INuevoPedidoState {}

class NuevoPedido extends React.Component<
  INuevoPedidoProps,
  INuevoPedidoState
> {
  constructor(props: INuevoPedidoProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { id } = this.props.match.params;
    const { productos } = this.props;
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Nuevo Pedido</h1>
        <div className="row">
          <div className="col-md-3">
            <DatosCliente id={id} />
          </div>
          <div className="col-md-9">
            <ContenidoPedido productos={productos} id={id} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withProductos(NuevoPedido);
