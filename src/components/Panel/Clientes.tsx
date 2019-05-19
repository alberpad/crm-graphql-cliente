import React from "react";
import { Query, QueryResult } from "react-apollo";
import { TOP_CLIENTES } from "../../data/queries";
import { ITopClientes } from "../../data/types";
import Spinner from "../Spinner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export interface IClientesProps {}

export interface IDatosGrafica {
  nombre: string;
  total: number;
}

const Clientes = (props: IClientesProps) => {
  return (
    <Query query={TOP_CLIENTES}>
      {({ loading, error, data }: QueryResult<ITopClientes>) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error.message}`;
        if (!data) return null;
        let datosGrafica: IDatosGrafica[] = [];
        data.topClientes.map(topCliente =>
          datosGrafica.push({
            nombre: topCliente.cliente[0].nombre,
            total: topCliente.total
          })
        );
        return (
          <BarChart
            width={800}
            height={400}
            data={datosGrafica}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#569848" />
          </BarChart>
        );
      }}
    </Query>
  );
};

export default Clientes;
