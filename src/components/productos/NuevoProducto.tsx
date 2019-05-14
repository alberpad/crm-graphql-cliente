import * as React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { NUEVO_PRODUCTO } from "../../data/productos/mutations";
import { RouteComponentProps } from "react-router-dom";

export interface INuevoProductoProps {}

export interface INuevoProductoState {
  nombre: string;
  precio: string;
  stock: string;
}

const initialState: INuevoProductoState = {
  nombre: "",
  precio: "",
  stock: ""
};

class NuevoProducto extends React.Component<
  RouteComponentProps<INuevoProductoProps>,
  Partial<INuevoProductoState>
> {
  constructor(props: RouteComponentProps<INuevoProductoProps>) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  limpiarState = () => {
    this.setState({
      ...initialState
    });
  };
  handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmitForm = (e: React.FormEvent, nuevoProducto: MutationFn) => {
    e.preventDefault();
    const { nombre, precio, stock } = this.state;
    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    nuevoProducto({ variables: { input } }).then(data => {
      this.limpiarState();
      this.props.history.push("/productos");
    });
  };

  validarForm = () => {
    const { nombre, precio, stock } = this.state;
    return !nombre || !precio || !stock;
  };

  handleOnClickCancelar = (e: React.MouseEvent) => {
    this.props.history.push("/productos");
  };

  public render() {
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Nuevo Producto</h1>
        <div className="row justify-content-center">
          <Mutation
            mutation={NUEVO_PRODUCTO}
            // onCompleted={() => this.props.history.push("/productos")}
            // Cambiamos el onComplete por el then de la Promise de la mutación
            // Hay reseteamos el estado y hacemos la redirección a productos
          >
            {(
              nuevoProducto: MutationFn,
              {
                //el loading, data y error es opcional, puede no ir
                //lo usamos para hacer un reseteo del estado
                loading,
                data,
                error
              }: MutationResult<Partial<INuevoProductoState>>
            ) => (
              <form
                onSubmit={e => this.handleOnSubmitForm(e, nuevoProducto)}
                className="col-md-8"
              >
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del Producto"
                    required
                    onChange={this.handleOnChangeForm}
                  />
                </div>
                <div className="form-group">
                  <label>Precio:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input
                      type="number"
                      name="precio"
                      className="form-control"
                      placeholder="Precio del Producto"
                      required
                      onChange={this.handleOnChangeForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="stock del Producto"
                    required
                    onChange={this.handleOnChangeForm}
                  />
                </div>
                <div className="float-right">
                  <button
                    disabled={this.validarForm()}
                    type="submit"
                    className="btn btn-success"
                  >
                    Crear Producto
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
        </div>
      </React.Fragment>
    );
  }
}

export default NuevoProducto;
