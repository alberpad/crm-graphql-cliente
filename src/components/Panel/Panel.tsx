import React from "react";
import Clientes from "./Clientes";
import Vendedores from "./Vendedores";

export interface IPanelProps {}

const Panel = (props: IPanelProps) => {
  return (
    <React.Fragment>
      <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
      <Clientes />
      <h1 className="text-center my-5">Top 10 Vendedores que más venden</h1>
      <Vendedores />
    </React.Fragment>
  );
};

export default Panel;
