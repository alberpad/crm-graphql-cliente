import React from "react";
import { ICliente } from "../../data/clientes/types";
import { NUEVO_CLIENTE } from "../../data/clientes/mutations";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";

export interface INuevoClienteProps extends RouteComponentProps {}
export interface INuevoClienteState extends Partial<ICliente> {
  cliente: Partial<ICliente>;
  emails: { email: string }[];
}
class NuevoCliente extends React.Component<
  INuevoClienteProps,
  INuevoClienteState
> {
  state: INuevoClienteState = {
    cliente: {},
    emails: []
  };

  handleOnSubmit = (e: React.FormEvent, crearCliente: MutationFn) => {
    e.preventDefault();
    const { nombre, apellido, edad, empresa, tipo } = this.state.cliente;
    const { emails } = this.state;
    const input = {
      nombre,
      apellido,
      edad: Number(edad),
      emails,
      empresa,
      tipo
    };
    crearCliente({
      variables: { input }
    });
  };

  handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    this.setState({
      cliente: {
        ...this.state.cliente,
        [e.target.name]: e.target.value
      }
    });
  };

  handleOnClickNuevoEmail = (e: React.MouseEvent) => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  handleOnClickEliminarEmail = (e: React.MouseEvent, i: number) => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    });
  };
  handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    // const nuevoEmail = this.state.emails.map((email, index) => {
    //   if (i !== index) return email;
    //   return {
    //     ...email,
    //     email: e.target.value
    //   };
    // });
    // this.setState({
    //   emails: nuevoEmail
    // });
    // Modificación del código de arriba del curso
    const emails = this.state.emails;
    emails[i] = { email: e.target.value };
    this.setState({
      emails
    });
  };

  handleOnClickCancelar = (e: React.MouseEvent) => {
    this.props.history.push("/clientes");
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        <div className="row justify-content-center">
          <Mutation
            mutation={NUEVO_CLIENTE}
            onCompleted={() => this.props.history.push("/clientes")}
          >
            {(crearCliente: MutationFn) => (
              <form
                onSubmit={e => this.handleOnSubmit(e, crearCliente)}
                className="col-md-8 m-3"
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      name="nombre"
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      name="apellido"
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Empresa"
                      name="empresa"
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>
                  {this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>Correo {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          value={input.email}
                          onChange={e => this.handleOnChangeEmail(e, index)}
                        />
                        <div className="input-group-append">
                          <button
                            onClick={e =>
                              this.handleOnClickEliminarEmail(e, index)
                            }
                            type="button"
                            className="btn btn-danger"
                          >
                            &times; Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                      onClick={this.handleOnClickNuevoEmail}
                      type="button"
                      className="btn btn-warning"
                    >
                      + Agregar Email
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Edad</label>
                    <input
                      type="text"
                      className="form-control"
                      name="edad"
                      placeholder="Edad"
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Tipo Cliente</label>
                    <select
                      className="form-control"
                      onChange={this.handleOnChange}
                      name="tipo"
                    >
                      <option value="">Elegir...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASICO">BÁSICO</option>
                    </select>
                  </div>
                </div>
                <div className="float-right">
                  <button type="submit" className="btn btn-success">
                    Guardar Cliente
                  </button>
                  <button
                    onClick={this.handleOnClickCancelar}
                    className="btn btn-success ml-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}

export default NuevoCliente;
