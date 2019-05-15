import React from "react";
import { Query, QueryResult } from "react-apollo";
import { GET_CLIENTE } from "../../data/queries";
import Spinner from "../Spinner";
import { IGetCliente } from "../../data/types";

export interface IDatosClienteProps {
  id: string;
}

export function DatosCliente(props: IDatosClienteProps) {
  const { id } = props;
  return (
    <React.Fragment>
      <h2 className="text-center mb-3">Cliente</h2>
      <Query query={GET_CLIENTE} variables={{ id }} pollInterval={500}>
        {({
          loading,
          error,
          data,
          startPolling,
          stopPolling
        }: QueryResult<IGetCliente>) => {
          if (loading) return <Spinner />;
          if (error) return `Error ${error.message}`;
          if (!data) return <p>No hay datos</p>;
          else {
            const {
              nombre,
              apellido,
              empresa,
              edad,
              emails,
              tipo
            } = data.getCliente;

            return (
              <ul className="list-unstyled my-5">
                <li className="border font-weight-bold p-2">
                  Nombre:
                  <span className="font-weight-normal ml-2">{nombre}</span>
                </li>
                <li className="border font-weight-bold p-2">
                  Apellido:
                  <span className="font-weight-normal ml-2">{apellido}</span>
                </li>
                <li className="border font-weight-bold p-2">
                  Edad:
                  <span className="font-weight-normal ml-2">{edad}</span>
                </li>
                <li className="border font-weight-bold p-2">
                  Empresa:
                  <span className="font-weight-normal ml-2">{empresa}</span>
                </li>
                <li className="border font-weight-bold p-2">
                  Tipo:
                  <span className="font-weight-normal ml-2">{tipo}</span>
                </li>
                <li className="border font-weight-bold p-2">
                  Emails:
                  <span className="font-weight-normal ml-2">
                    {emails &&
                      emails.map((email, index) => (
                        <div key={index} className="font-weight-bold ml-2 mt-2">
                          <span className="font-weight-normal">
                            {" "}
                            {email.email}
                          </span>
                        </div>
                      ))}
                  </span>
                </li>
              </ul>
            );
          }
        }}
      </Query>
    </React.Fragment>
  );
}
