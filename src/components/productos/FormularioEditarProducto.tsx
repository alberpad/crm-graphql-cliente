import * as React from "react";

export interface IFormularioEditarProductoProps {}

export interface IFormularioEditarProductoState {}

export default class FormularioEditarProducto extends React.Component<
  IFormularioEditarProductoProps,
  IFormularioEditarProductoState
> {
  constructor(props: IFormularioEditarProductoProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <h2>Formualrio Editar Producto</h2>
      </div>
    );
  }
}
