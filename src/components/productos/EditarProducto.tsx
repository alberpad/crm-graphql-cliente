import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Query, QueryResult } from "react-apollo";
import { GET_PRODUCTO } from "../../data/productos/queries";
import { IGetProducto, IProducto } from "../../data/productos/types";
import Spinner from "../Spinner";
import FormularioEditarProducto from "./FormularioEditarProducto";

export interface IEditarProductoProps
  extends RouteComponentProps<{ id: string }> {}

export interface IEditarProductoState {}

export default class EditarProducto extends React.Component<
  IEditarProductoProps,
  IEditarProductoState
> {
  public render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1 className="text-center">Editar Producto</h1>
        <div className="row justify-content-center">
          <Query query={GET_PRODUCTO} variables={{ id }}>
            {({ loading, error, data, refetch }: QueryResult<IGetProducto>) => {
              if (loading) return <Spinner />;
              if (error) return `Error ${error.message}`;
              if (data)
                return (
                  <FormularioEditarProducto
                    producto={data.getProducto}
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
