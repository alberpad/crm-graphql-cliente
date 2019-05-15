import * as React from "react";
import { IProducto, IGetProducto } from "../../data/types";
import { OperationVariables, MutationFn, Mutation } from "react-apollo";
import { ApolloQueryResult } from "apollo-boost";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ACTUALIZAR_PRODUCTO } from "../../data/mutations";

export interface IFormularioEditarProductoProps extends RouteComponentProps {
  producto: Partial<IProducto>;
  refetch: (
    variables?: OperationVariables | undefined
  ) => Promise<ApolloQueryResult<IGetProducto>>;
}

export interface IFormularioEditarProductoState {
  id: string | undefined;
  nombre: string | undefined;
  precio: string | undefined;
  stock: string | undefined;
}

class FormularioEditarProducto extends React.Component<
  IFormularioEditarProductoProps,
  IFormularioEditarProductoState
> {
  state: IFormularioEditarProductoState = {
    id: "",
    nombre: "",
    precio: "",
    stock: ""
  };

  componentDidMount() {
    const { nombre, precio, stock, id } = this.props.producto;
    if (nombre && precio && stock && id) {
      this.setState({
        id,
        nombre,
        precio: precio.toString(),
        stock: stock.toString()
      });
    }
  }

  handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmitForm = (e: React.FormEvent, actualizarProducto: MutationFn) => {
    e.preventDefault();
    const { nombre, precio, stock, id } = this.state;
    const input = {
      id,
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    actualizarProducto({ variables: { input } });
    //   .then(data => {
    //   this.props.history.push("/productos");
    // });
  };

  handleOnClickCancelar = (e: React.MouseEvent) => {
    this.props.history.push("/productos");
  };

  validarForm = (): boolean => {
    const { nombre, precio, stock } = this.state;
    if (nombre && precio && stock) return false;
    else return true;
  };

  public render() {
    const { nombre, precio, stock } = this.state;
    return (
      <React.Fragment>
        <Mutation
          mutation={ACTUALIZAR_PRODUCTO}
          onCompleted={() =>
            this.props.refetch().then(() => {
              //refetch fuerza a tener los valores actualizados, no los cacheados por apollo
              this.props.history.push("/productos");
            })
          }
        >
          {(actualizarProducto: MutationFn) => (
            <form
              className="col-md-8"
              onSubmit={e => this.handleOnSubmitForm(e, actualizarProducto)}
            >
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  onChange={this.handleOnChangeForm}
                  type="text"
                  name="nombre"
                  className="form-control"
                  defaultValue={nombre}
                  placeholder="Nombre del Producto"
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    onChange={this.handleOnChangeForm}
                    type="number"
                    name="precio"
                    defaultValue={precio}
                    className="form-control"
                    placeholder="Precio del Producto"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input
                  onChange={this.handleOnChangeForm}
                  type="number"
                  name="stock"
                  defaultValue={stock}
                  className="form-control"
                  placeholder="stock del Producto"
                  required
                />
              </div>
              <div className="float-right">
                <button
                  disabled={this.validarForm()}
                  type="submit"
                  className="btn btn-success"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={this.handleOnClickCancelar}
                  className="btn btn-success ml-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}
export default withRouter(FormularioEditarProducto);
