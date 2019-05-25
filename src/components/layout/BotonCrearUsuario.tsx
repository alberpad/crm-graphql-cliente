import React from "react";
import { Link } from "react-router-dom";
import { IGetUsuario } from "../../data/types";

export interface IBotonCrearUsuarioProps {
  session: IGetUsuario;
}

const BotonCrearUsuario = (props: IBotonCrearUsuarioProps) => {
  if (props.session.getUsuario.rol !== "ADMINISTRADOR") return null;
  return (
    <Link to="/registro" className="btn btn-light ml-md-2 mt-2 mt-md-0">
      Crear Usuario
    </Link>
  );
};

export default BotonCrearUsuario;
