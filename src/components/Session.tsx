import React from "react";
import { Query, QueryResult } from "react-apollo";
import { USUARIO_ACTUAL } from "../data/queries";
import { IGetUsuario } from "../data/types";

export interface ISessionProps {}

// const Session = <P extends ISessionProps>(
//   WrappedComponent: React.ComponentType<P>
// ) => (props: P) => (
//   <Query query={USUARIO_ACTUAL}>
//     {({ loading, error, data, refetch }: QueryResult<IGetUsuario>) => {
//       if (loading) return null;
//       if (error) return `Error: ${error.message}`;
//       return (
//         <WrappedComponent {...props as P} session={data} refetch={refetch} />
//       );
//     }}
//   </Query>
// );

// export default Session;

const Session = <P extends ISessionProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<ISessionProps> {
    public render() {
      return (
        <Query query={USUARIO_ACTUAL}>
          {({ loading, error, data, refetch }: QueryResult<IGetUsuario>) => {
            // if (loading || !data) return null;
            if (loading) return null;

            if (error) return `Error: ${error.message}`;
            return (
              <WrappedComponent
                {...this.props as P}
                session={data}
                refetch={refetch}
              />
            );
          }}
        </Query>
      );
    }
  };
};

export default Session;
