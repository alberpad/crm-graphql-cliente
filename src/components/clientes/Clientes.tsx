import React from "react";
import { Link } from "react-router-dom";
import { Query, QueryResult, Mutation, MutationFn } from "react-apollo";
import { GET_CLIENTES } from "../../data/queries";
import { ELIMINAR_CLIENTE } from "../../data/mutations";
import { IGetClientes } from "../../data/types";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import Paginador from "../layout/Paginador";
import withPaginador from "../hoc/withPaginador";

export interface IClientesProps {
  paginador: {
    offset: number;
    actual: number;
    limitePaginas: number;
    paginaAnterior: () => void;
    paginaSiguiente: () => void;
  };
}
export interface IClientesState {
  // paginador: {
  //   offset: number;
  //   actual: number;
  // };
}
class Clientes extends React.Component<IClientesProps, IClientesState> {
  // constructor(props: IClientesProps) {
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

  render() {
    const { paginador } = this.props;
    return (
      //pollInterval es para recargar automaticamente la consulta y por ende la página
      // startPolling y stopPolling son necesarias aunque no se usen directamnte ?? Parece que no
      <Query
        query={GET_CLIENTES}
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
        QueryResult<IGetClientes>) => {
          if (loading) return <Spinner />;
          if (error) return `Error: ${error.message}`;
          if (!data) return null;

          return (
            <React.Fragment>
              <div>
                <h2 className="inline-block">
                  Listado de Clientes
                  <Link
                    to="/clientes/nuevo"
                    className="btn btn-secondary text-light ml-4"
                  >
                    &#43;
                  </Link>
                </h2>
              </div>
              <ul className="list-group mt-4">
                {data.getClientes.map(cliente => {
                  const { id, nombre, apellido, empresa } = cliente;
                  return (
                    <li key={id} className="list-group-item">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-7 d-flex justify-content-between align-items-center">
                          {nombre} {apellido} {empresa}
                        </div>
                        <div className="col-md-5 d-flex justify-content-end">
                          <Link
                            to={`/pedidos/nuevo/${id}`}
                            className="btn btn-warning d-block d-md-inline-block mr-2"
                          >
                            &#43; Pedido
                          </Link>
                          <Link
                            to={`/pedidos/${id}`}
                            className="btn btn-warning d-block d-md-inline-block mr-2"
                          >
                            Ver Pedidos
                          </Link>
                          <Mutation mutation={ELIMINAR_CLIENTE}>
                            {(eliminarCliente: MutationFn) => (
                              <button
                                type="button"
                                className="btn btn-danger d-block d-md-inline-clock mr-2"
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
                                      eliminarCliente({ variables: { id } });
                                      Swal.fire(
                                        "Eliminado!",
                                        `El cliente con id: ${id} ha sido eliminado`,
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
                          <Link
                            to={`/clientes/editar/${id}`}
                            className="btn btn-success text-light d-block d-md-inline-block"
                          >
                            Editar Cliente
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Paginador
                // actual={this.state.paginador.actual}
                actual={paginador.actual}
                total={data.totalClientes}
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
    );
  }
}

export default withPaginador(5, Clientes);
