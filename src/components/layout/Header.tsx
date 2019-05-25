import React from "react";
import { Link } from "react-router-dom";
import { IGetUsuario } from "../../data/types";
import CerrarSesion from "./CerrarSesion";
import BotonRegistro from "./BotonCrearUsuario";

interface IHeaderProps {
  session: IGetUsuario;
}
const Header = ({ session }: IHeaderProps) => {
  let header = session.getUsuario ? (
    <NavegacionAutenticada session={session} />
  ) : (
    <NavegacionNoAutenticada />
  );
  return (
    <nav className="navbar navbar-expand-lg mb-4 navbar-dark bg-secondary justify-content-between d-flex">
      <div className="container">{header}</div>
    </nav>
  );
};

const NavegacionNoAutenticada = () => {
  return (
    <h3 className="navbar-brand text-light font-weight-bold">JUPABE CRM</h3>
  );
};

const NavegacionAutenticada = ({ session }: IHeaderProps) => {
  const { rol } = session.getUsuario;
  const registro =
    rol === "ADMINISTRADOR" ? (
      <Link to="/registro" className="dropdown-item">
        Registro
      </Link>
    ) : null;

  return (
    <React.Fragment>
      <Link to="/" className="navbar-brand text-light font-weight-bold">
        JUPABE CRM
      </Link>
      <p className="text-light mt-3">
        {`| Bienvenido ${session.getUsuario.nombre}`}
      </p>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navegacion"
        aria-controls="navegacion"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navegacion">
        <ul className="navbar-nav ml-auto text-right">
          <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
            <button
              className="nav-link dropdown-toggle btn btn-block btn-primary"
              data-toggle="dropdown"
            >
              Administración
            </button>
            <div className="dropdown-menu" aria-labelledby="navegacion">
              <Link to="/panel" className="dropdown-item">
                Panel
              </Link>
              {registro}
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
            <button
              className="nav-link dropdown-toggle btn btn-block btn-primary"
              data-toggle="dropdown"
            >
              Clientes
            </button>
            <div className="dropdown-menu" aria-labelledby="navegacion">
              <Link to="/clientes" className="dropdown-item">
                Listado de Clientes
              </Link>
              <Link to="/clientes/nuevo" className="dropdown-item">
                Nuevo Cliente
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-block btn-primary"
              data-toggle="dropdown"
            >
              Productos
            </button>
            <div className="dropdown-menu" aria-labelledby="navegacion">
              <Link to="/productos" className="dropdown-item">
                Listado de Productos
              </Link>
              <Link to="/productos/nuevo" className="dropdown-item">
                Nuevo Producto
              </Link>
            </div>
          </li>
          <BotonRegistro session={session} />
          <CerrarSesion />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Header;
