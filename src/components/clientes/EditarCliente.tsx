import React from "react";
import { RouteComponentProps } from "react-router";
import { Query, QueryResult } from "react-apollo";
import { IGetCliente, ICliente } from "../../data/types";
import { GET_CLIENTE } from "../../data/queries";
import FormularioEditarCliente from "./FormularioEditarCliente";
import Spinner from "../Spinner";

export interface IEditarClienteProps
  extends RouteComponentProps<{ id: string }> {}
export interface IEditarClienteState {
  cliente: ICliente;
}

class EditarCliente extends React.Component<
  IEditarClienteProps,
  IEditarClienteState
> {
  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h2 className="text-center">Editar Cliente</h2>
        <div className="row justify-content-center">
          <Query query={GET_CLIENTE} variables={{ id }}>
            {({ loading, error, data, refetch }: QueryResult<IGetCliente>) => {
              // Para evitar el cache de apollo y tener siempre los ultimos valores usamos refetch
              // si le pasamo refetc al formualrio, cuando se modifique el cliente estará en cache los datos antiguos
              // al menos hasta que se recargue la página.
              if (loading) return <Spinner />;
              if (error) return `Error: ${error.message}`;
              if (data)
                return (
                  <FormularioEditarCliente
                    //{...this.props} // pasa history, match y location por props
                    // pero en vez de pasarlas por props usamos withRouter en el componente Formulario...
                    cliente={data.getCliente}
                    refetch={refetch}
                  />
                );
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

export default EditarCliente;
