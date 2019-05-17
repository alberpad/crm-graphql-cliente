import React from "react";
import { Query, QueryResult } from "react-apollo";
import { GET_PRODUCTOS } from "../../data/queries";
import { IGetProductos, IProducto } from "../../data/types";
import Spinner from "../Spinner";

export interface IWithProductosProps {}

export interface IWithProductosState {}

function withProductos<P extends IWithProductosProps>(
  stock: boolean, // true para obtener productos con stock > 1
  WrappedComponent: React.ComponentType<P>
) {
  return class extends React.Component<
    IWithProductosProps,
    IWithProductosState
  > {
    constructor(props: IWithProductosProps) {
      super(props);

      this.state = {};
    }

    public render() {
      return (
        <Query query={GET_PRODUCTOS} variables={{ stock: stock }}>
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
              <WrappedComponent
                productos={data.getProductos}
                {...this.props as P}
              />
            );
          }}
        </Query>
      );
    }
  };
}

export default withProductos;
