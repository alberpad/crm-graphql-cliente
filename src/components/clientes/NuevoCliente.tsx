import React from "react";

export interface INuevoClienteProps {}

function NuevoCliente(props: INuevoClienteProps) {
  return (
    <React.Fragment>
      <h2 className="text-center">Nuevo Cliente</h2>
      <div className="row justify-content-center">
        <form className="col-md-8 m-3">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Empresa</label>
              <input
                type="text"
                className="form-control"
                placeholder="Empresa"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Edad</label>
              <input type="text" className="form-control" placeholder="Edad" />
            </div>
            <div className="form-group col-md-6">
              <label>Tipo Cliente</label>
              <select className="form-control">
                <option value="">Elegir...</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="BASICO">BÁSICO</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success float-right">
            Guardar Cambios
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NuevoCliente;
