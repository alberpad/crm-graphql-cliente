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
            <li className="nav-item active">
              <Link to="/clientes/nuevo" className="btn btn-primary text-light">
                Nuevo Cliente
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
