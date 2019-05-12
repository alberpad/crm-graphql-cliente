import * as React from "react";

export interface IEditarProductoProps {}

export interface IEditarProductoState {}

export default class EditarProducto extends React.Component<
  IEditarProductoProps,
  IEditarProductoState
> {
  constructor(props: IEditarProductoProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <h2>Editar Producto</h2>
      </div>
    );
  }
}
