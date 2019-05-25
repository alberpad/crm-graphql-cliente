import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IGetUsuario } from "../../data/types";

export type ExtendedRoute = RouteProps;
export interface IPrivateRouteProps extends ExtendedRoute {
  component: any;
  usuarioAutenticado: boolean;
  session?: IGetUsuario;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, usuarioAutenticado, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps =>
        usuarioAutenticado ? (
          <Component {...routeProps} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

// class PrivateRoute extends React.Component<any, any> {
//   render() {
//     const { component, usuarioAutenticado, ...rest } = this.props;
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           usuarioAutenticado ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }
// }

export default PrivateRoute;
