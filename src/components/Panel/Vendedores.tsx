import React from "react";
import { Query, QueryResult } from "react-apollo";
import { TOP_VENDEDORES } from "../../data/queries";
import { ITopVendedores } from "../../data/types";
import Spinner from "../Spinner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export interface IVendedoresProps {}

export interface IDatosGrafica {
  nombre: string;
  total: number;
}

const Vendedores = (props: IVendedoresProps) => {
  return (
    <Query query={TOP_VENDEDORES}>
      {({ loading, error, data }: QueryResult<ITopVendedores>) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error.message}`;
        if (!data) return null;
        console.log(data);
        let datosGrafica: IDatosGrafica[] = [];

        data.topVendedores.map(topVendedor =>
          datosGrafica.push({
            nombre: topVendedor.vendedor[0] && topVendedor.vendedor[0].nombre,
            total: topVendedor.total
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

export default Vendedores;
