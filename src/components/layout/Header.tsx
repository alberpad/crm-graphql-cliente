import React from "react";
import { Link } from "react-router-dom";

interface IHeader {}
const Header = (props: IHeader) => {
  return (
    <nav className="navbar navbar-expand-lg mb-4 navbar-dark bg-secondary justify-content-between d-flex">
      <div className="container">
        <Link to="/" className="navbar-brand text-light font-weight-bold">
          JUPABE CRM
        </Link>
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
                <Link to="/registro" className="dropdown-item">
                  Registro
                </Link>
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
