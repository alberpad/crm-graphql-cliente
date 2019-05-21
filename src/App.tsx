import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";
import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import PedidosCliente from "./components/pedidos/PedidosCliente";
import Panel from "./components/Panel/Panel";
import Registro from "./components/Auth/Registro";
import Login from "./components/Auth/Login";

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
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route
                exact
                path="/productos/editar/:id"
                component={EditarProducto}
              />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
              <Route exact path="/pedidos/:id" component={PedidosCliente} />
              <Route exact path="/panel" component={Panel} />
              <Route exact path="/registro" component={Registro} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
};

export default App;
