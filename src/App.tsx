import React from "react";
import { OperationVariables } from "react-apollo";
import { ApolloQueryResult } from "apollo-boost";
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
import Session from "./components/Session";
import { IGetUsuario } from "./data/types";
import PrivateRoute from "./components/Auth/PrivateRoute";

// refetch y session from RootSession
interface IAppProps {
  refetch: (
    variables?: OperationVariables | undefined
  ) => Promise<ApolloQueryResult<IGetUsuario>>;
  session: IGetUsuario;
}

const App: React.FC<IAppProps> = ({ refetch, session }) => {
  const { getUsuario } = session;
  console.log(session);

  // const mensaje = getUsuario ? (
  //   `Bienvenido ${getUsuario.usuario}`
  // ) : (
  //   <Route render={() => <Redirect to="/login" />} />
  // );
  let usuarioAutenticado = false;
  if (getUsuario) usuarioAutenticado = true;
  return (
    <Router>
      <React.Fragment>
        <Header session={session} />
        <div className="container">
          <Switch>
            {/* <PrivateRoute
              exact
              path="/"
              component={Clientes}
              usuarioAutenticado={session}
            /> */}
            <PrivateRoute
              exact
              path="/"
              component={Clientes}
              session={session}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/clientes"
              component={Clientes}
              session={session}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/clientes/nuevo"
              component={NuevoCliente}
              session={session}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              usuarioAutenticado={usuarioAutenticado}
              exact
              path="/clientes/editar/:id"
              component={EditarCliente}
            />
            <PrivateRoute
              exact
              path="/productos"
              component={Productos}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/productos/nuevo"
              component={NuevoProducto}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/pedidos/nuevo/:id"
              component={NuevoPedido}
              session={session}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/pedidos/:id"
              component={PedidosCliente}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/panel"
              component={Panel}
              usuarioAutenticado={usuarioAutenticado}
            />
            <PrivateRoute
              exact
              path="/registro"
              component={Registro}
              session={session}
              usuarioAutenticado={usuarioAutenticado}
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} refetch={refetch} />}
            />
            <Route path="/:any" component={Login} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

export const RootSession = Session(App);
