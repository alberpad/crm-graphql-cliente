import React from "react";
import { Link } from "react-router-dom";
import { Query, QueryResult } from "react-apollo";
import { GET_CLIENTES, IGetClientes } from "../../queries/clientes";

export interface IClientesProps {}

function Clientes(props: IClientesProps) {
  return (
    <Query query={GET_CLIENTES}>
      {({ loading, error, data }: QueryResult<IGetClientes>) => {
        if (loading) return "cargando...";
        if (error) return `Error: ${error.message}`;
        if (data) console.log(data.getClientes);
        else return null;
        return (
          <React.Fragment>
            <h2 className="text-center">Listado de Clientes</h2>
            <ul className="list-group mt-4">
              {data.getClientes.map(cliente => (
                <li key={cliente.id} className="list-group-item">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                      {cliente.nombre} {cliente.apellido}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <Link
                        to={`/clientes/editar/${cliente.id}`}
                        className="btn btn-info text-light d-block d-md-inline-block"
                      >
                        Editar Cliente
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default Clientes;
