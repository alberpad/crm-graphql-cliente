import React from "react";
import Clientes from "./Clientes";

export interface IPanelProps {}

const Panel = (props: IPanelProps) => {
  return (
    <React.Fragment>
      <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
      <Clientes />
    </React.Fragment>
  );
};

export default Panel;
