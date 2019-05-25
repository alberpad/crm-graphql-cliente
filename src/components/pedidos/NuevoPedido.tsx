import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { DatosCliente } from "../clientes/DatosCliente";
import withProductos from "../hoc/withProductos";
import { IProducto, IGetUsuario } from "../../data/types";
import ContenidoPedido from "./ContenidoPedido";

export interface INuevoPedidoProps extends RouteComponentProps<{ id: string }> {
  productos: IProducto[];
  session: IGetUsuario;
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
    console.log(this.props);
    const idVendedor = this.props.session.getUsuario.id;
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
            <ContenidoPedido
              productos={productos}
              id={id}
              idVendedor={idVendedor}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withProductos(true, NuevoPedido);
