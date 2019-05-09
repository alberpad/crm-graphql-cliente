import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLError", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/clientes" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route
                exact
                path="/clientes/editar/:id"
                component={EditarCliente}
              />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
};

export default App;
