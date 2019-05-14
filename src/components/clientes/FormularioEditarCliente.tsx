import React, { Component } from "react";
import { ICliente, IGetCliente } from "../../data/clientes/types";
import { ACTUALIZAR_CLIENTE } from "../../data/clientes/mutations";
import { Mutation, MutationFn, OperationVariables } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { ApolloQueryResult } from "apollo-boost";

interface IFormularioEditarClienteProps
  extends RouteComponentProps<{ id: string }> {
  cliente: Partial<ICliente>;
  refetch: (
    variables?: OperationVariables | undefined
  ) => Promise<ApolloQueryResult<IGetCliente>>;
}
interface IFormularioEditarClienteState {
  emails: { email: string }[];
  cliente: Partial<ICliente>;
}
class FormularioEditarCliente extends Component<
  IFormularioEditarClienteProps,
  IFormularioEditarClienteState
> {
  state: IFormularioEditarClienteState = {
    emails: [],
    cliente: {}
  };

  componentDidMount() {
    const { cliente } = this.props;
    if (cliente.emails)
      this.setState({
        emails: cliente.emails,
        cliente
      });
  }

  handleOnSubmitFormulario = (
    e: React.FormEvent,
    actualizarCliente: MutationFn
  ) => {
    e.preventDefault();
    const input: Partial<ICliente> = {
      ...this.state.cliente,
      emails: this.state.emails
    };
    console.log(input);
    actualizarCliente({ variables: { input } });
  };
  handleOnClickAgregarEmail = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const nuevoMail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return { ...email, email: e.target.value };
    });
    this.setState({ emails: nuevoMail });
  };

  handleOnClickEliminarEmail = (i: number) => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  };

  handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    let value: string | number;
    if (e.target.name === "edad") {
      value = Number(e.target.value);
    } else value = e.target.value;
    this.setState({
      cliente: {
        ...this.state.cliente,
        [e.target.name]: value
      }
    });
  };

  handleOnClickCancelar = (e: React.MouseEvent) => {
    this.props.history.push("/clientes");
  };

  render() {
    const { emails } = this.state;
    const { nombre, tipo, empresa, edad, apellido } = this.state.cliente;
    let _edad: string;
    edad ? (_edad = edad.toString()) : (_edad = "");
    return (
      <Mutation
        mutation={ACTUALIZAR_CLIENTE}
        onCompleted={() =>
          this.props.refetch().then(() => {
            //refetch fuerza a tener los valores actualizados, no los cacheados por apollo
            this.props.history.push("/clientes");
          })
        }
      >
        {(actualizarCliente: MutationFn) => (
          <form
            onSubmit={e => this.handleOnSubmitFormulario(e, actualizarCliente)}
            className="col-md-8 m-3"
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  defaultValue={nombre}
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  defaultValue={apellido}
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
                  name="empresa"
                  className="form-control"
                  defaultValue={empresa}
                  required
                  onChange={this.handleOnChange}
                />
              </div>

              {emails.map((input, index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Email {index + 1} : </label>
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder={`Email`}
                      className="form-control"
                      onChange={e => this.handleOnChangeEmail(e, index)}
                      defaultValue={input.email}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => this.handleOnClickEliminarEmail(index)}
                      >
                        &times; Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button
                  onClick={this.handleOnClickAgregarEmail}
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
                  type="number"
                  name="edad"
                  className="form-control"
                  defaultValue={_edad}
                  required
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select
                  className="form-control"
                  name="tipo"
                  value={tipo}
                  onChange={this.handleOnChange}
                  required
                >
                  <option value="">Elegir...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-success">
                Guardar Cambios
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
    );
  }
}

export default withRouter(FormularioEditarCliente);
