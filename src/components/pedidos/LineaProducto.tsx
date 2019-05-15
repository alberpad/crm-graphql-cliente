import React from "react";
import { IProducto } from "../../data/types";

export interface ILineaProductoProps {
  id: string;
  producto: IProducto;
  index: number;
  actualizarCantidad: (cantidad: number, index: number) => void;
  eliminarProducto: (id: string) => void;
}

export interface ILineaProductoState {
  cantidad: number;
}

class LineaProducto extends React.Component<
  ILineaProductoProps,
  ILineaProductoState
> {
  constructor(props: ILineaProductoProps) {
    super(props);

    this.state = {
      cantidad: 0
    };
  }

  handleOnChangeCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cantidad = Number(e.currentTarget.value);
    const { index } = this.props;
    if (cantidad < 0) return;
    this.setState({
      cantidad
    });
    this.props.actualizarCantidad(cantidad, index);
  };

  public render() {
    const { producto, eliminarProducto } = this.props;
    return (
      <React.Fragment>
        <tr className="clearfix">
          <td>{producto.nombre}</td>
          <td className="text-right">$ {producto.precio}</td>
          <td className="text-center">{producto.stock}</td>
          <td>
            <input
              type="number"
              className="form-control"
              onChange={this.handleOnChangeCantidad}
            />
          </td>
          <td>
            <button
              type="button"
              className="float-right btn btn-danger font-weight-bold"
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default LineaProducto;
