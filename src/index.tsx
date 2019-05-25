import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RootSession } from "./App";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";

// cache -> InMemoryCache -> addTypename: false : Eliminar el añadido automatico de __typename en los objetos
const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  // Enviar Token al Servidor
  fetchOptions: {
    credentials: "include"
  },
  request: async operation => {
    const token = localStorage.getItem("token");
    await operation.setContext({
      headers: { authorization: token }
    });
  },
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLError", graphQLErrors);
    console.log("networkError", networkError);
  }
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <RootSession />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
