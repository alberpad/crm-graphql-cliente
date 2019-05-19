import * as React from "react";
import { IProducto } from "../../data/types";
import Select from "react-select";
import Animated from "react-select/lib/animated";
import { ValueType } from "react-select/lib/types";
import ResumenPedido from "./ResumenPedido";
import { IProductosPedidos } from "../../data/types";
import GenerarPedido from "./GenerarPedido";
import Error from "../Alertas/Error";

export interface IContenidoPedidoProps {
  productos: IProducto[];
  id: string;
}

export interface IContenidoPedidoState {
  productosPedidos: IProductosPedidos[];
  total: number;
}

export default class ContenidoPedido extends React.Component<
  IContenidoPedidoProps,
  IContenidoPedidoState
> {
  constructor(props: IContenidoPedidoProps) {
    super(props);

    this.state = {
      productosPedidos: [],
      total: 0
    };
  }
  handleOnChangeSelect = (productos: ValueType<IProducto>) => {
    this.setState({
      productosPedidos: productos as IProductosPedidos[]
    });
  };

  actualizarCantidad = (cantidad: number, index: number) => {
    const { productosPedidos } = this.state;
    // Actualizamos cantidad en el producto
    productosPedidos[index].cantidad = cantidad;
    this.setState(
      {
        productosPedidos
      },
      () => {
        this.actualizarTotal();
      }
    );
  };

  eliminarProducto = (id: string) => {
    const { productosPedidos } = this.state;
    const productosRestantes = productosPedidos.filter(
      producto => producto.id !== id
    );
    this.setState(
      {
        productosPedidos: productosRestantes
      },
      () => this.actualizarTotal()
    );
  };

  actualizarTotal = () => {
    const { productosPedidos } = this.state;
    let total = 0;
    if (productosPedidos.length === 0) {
      this.setState({
        total
      });
      return;
    }
    productosPedidos.map(
      producto => (total += producto.cantidad * producto.precio)
    );
    this.setState({
      total
    });
  };

  public render() {
    const { productosPedidos } = this.state;
    const mensaje =
      this.state.total < 0 ? (
        <Error error="Las Cantidades no pueden ser negativas" />
      ) : (
        ""
      );
    return (
      <React.Fragment>
        <h2 className="text-center mb-5">Seleccionar artículos</h2>
        <Select<IProducto>
          options={this.props.productos}
          isMulti={true}
          components={Animated()}
          placeholder={"Seleccionar productos"}
          getOptionValue={(options: IProducto) => options.id}
          getOptionLabel={(options: IProducto) => options.nombre}
          onChange={this.handleOnChangeSelect}
          value={this.state.productosPedidos}
        />
        <ResumenPedido
          productos={productosPedidos}
          actualizarCantidad={this.actualizarCantidad}
          eliminarProducto={this.eliminarProducto}
        />
        <p className="font-weight-bold float-right">
          Total:
          <span className="font-weight-normal">$ {this.state.total}</span>
        </p>
        {mensaje}
        <GenerarPedido
          productos={this.state.productosPedidos}
          total={this.state.total}
          clienteId={this.props.id}
        />
      </React.Fragment>
    );
  }
}
