import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ApolloClient } from "apollo-boost";

export interface ICerrarSesionProps extends RouteComponentProps {}

const handleOnClick = (
  e: React.MouseEvent,
  cliente: ApolloClient<any>,
  props: ICerrarSesionProps
) => {
  localStorage.removeItem("token");
  cliente.resetStore();
  props.history.push("login");
};

const CerrarSesion = (props: ICerrarSesionProps) => (
  <ApolloConsumer>
    {cliente => {
      return (
        <button
          onClick={e => handleOnClick(e, cliente, props)}
          className="btn btn-light ml-md-2 mt-2 mt-md-0"
        >
          Cerrar Sesión
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(CerrarSesion);
