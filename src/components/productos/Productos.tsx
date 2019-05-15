import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation, QueryResult, MutationFn } from "react-apollo";
import { GET_PRODUCTOS } from "../../data/queries";
import { IGetProductos } from "../../data/types";
import Spinner from "../Spinner";
import { ELIMINAR_PRODUCTO } from "../../data/mutations";
import Swal from "sweetalert2";
import Paginador from "../layout/Paginador";
import withPaginador from "../../components/hoc/withPaginador";

export interface IProductosProps {
  paginador: {
    offset: number;
    actual: number;
    limitePaginas: number;
    paginaAnterior: () => void;
    paginaSiguiente: () => void;
  };
}

export interface IProductosState {
  // paginador: {
  //   offset: number;
  //   actual: number;
  // };
}

class Productos extends React.Component<IProductosProps, IProductosState> {
  // constructor(props: IProductosProps) {
  //   super(props);

  //   this.state = {
  //     paginador: {
  //       offset: 0,
  //       actual: 1
  //     }
  //   };
  // }

  // limitePaginas = 7;

  // paginaAnterior = () => {
  //   this.setState({
  //     paginador: {
  //       offset: this.state.paginador.offset - this.limitePaginas,
  //       actual: this.state.paginador.actual - 1
  //     }
  //   });
  // };

  // paginaSiguiente = () => {
  //   this.setState({
  //     paginador: {
  //       offset: this.state.paginador.offset + this.limitePaginas,
  //       actual: this.state.paginador.actual + 1
  //     }
  //   });
  // };

  public render() {
    const { paginador } = this.props;
    return (
      <React.Fragment>
        <h2 className="text-left">
          Listado de Productos
          <Link
            to="/productos/nuevo"
            className="btn btn-danger text-light ml-4"
          >
            +
          </Link>
        </h2>
        <Query
          query={GET_PRODUCTOS}
          pollInterval={500}
          variables={{
            // limite: this.limitePaginas,
            limite: paginador.limitePaginas,
            // offset: this.state.paginador.offset
            offset: paginador.offset
          }}
        >
          {({
            loading,
            error,
            data
          }: // startPolling,
          // stopPolling
          QueryResult<IGetProductos>) => {
            if (loading) return <Spinner />;
            if (error) return `Error: ${error.message}`;
            if (!data) return null;
            return (
              <React.Fragment>
                <table className="table mt-4">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Nombre</th>
                      <th scope="col" className="text-center">
                        Precio
                      </th>
                      <th scope="col" className="text-center">
                        Existencia
                      </th>
                      <th scope="col" className="text-center">
                        Editar
                      </th>
                      <th scope="col" className="text-center">
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProductos.map(producto => {
                      const { id } = producto;
                      return (
                        <tr key={id}>
                          <td>{producto.nombre}</td>
                          <td className="text-center">{producto.precio}</td>
                          <td className="text-center">{producto.stock}</td>
                          <td className="text-center">
                            <Link
                              to={`/productos/editar/${id}`}
                              className="btn btn-success text-light d-block d-md-inline-block"
                            >
                              Editar Producto
                            </Link>
                          </td>
                          <td>
                            <Mutation mutation={ELIMINAR_PRODUCTO}>
                              {(eliminarProducto: MutationFn) => (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Estás seguro?",
                                      text: "La eliminacion será definitiva!",
                                      type: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Eliminar!",
                                      cancelButtonText: "Cancelar!"
                                    }).then(result => {
                                      if (result.value) {
                                        eliminarProducto({ variables: { id } });
                                        Swal.fire(
                                          "Eliminado!",
                                          `El producto con id: ${id} ha sido eliminado`,
                                          "success"
                                        );
                                      }
                                    });
                                    // if (
                                    //   window.confirm(
                                    //     "¿Quieres eliminar este cliente?"
                                    //   )
                                    // )
                                    //   eliminarCliente({ variables: { id } });
                                  }}
                                >
                                  &times; Eliminar
                                </button>
                              )}
                            </Mutation>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Paginador
                  // actual={this.state.paginador.actual}
                  actual={paginador.actual}
                  total={data.totalProductos}
                  // limitePaginas={this.limitePaginas}
                  limitePaginas={paginador.limitePaginas}
                  // paginaAnterior={this.paginaAnterior}
                  paginaAnterior={paginador.paginaAnterior}
                  // paginaSiguiente={this.paginaSiguiente}
                  paginaSiguiente={paginador.paginaSiguiente}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
export default withPaginador(5, Productos);
