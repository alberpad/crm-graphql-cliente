import React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { NUEVO_USUARIO } from "../../data/mutations";
import { IUsuario, IGetUsuario } from "../../data/types";
import { RouteComponentProps } from "react-router";
import Error from "../Alertas/Error";

export interface IRegistroProps extends RouteComponentProps {
  session: IGetUsuario;
}

export interface IRegistroState {
  usuario: string;
  password: string;
  nombre: string;
  rol: string;
  repetirPassword: string;
}

const initialState: IRegistroState = {
  usuario: "",
  password: "",
  nombre: "",
  rol: "",
  repetirPassword: ""
};

class Registro extends React.Component<IRegistroProps, IRegistroState> {
  constructor(props: IRegistroProps) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  limpiarState = () => {
    this.setState({
      ...initialState
    });
  };

  handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    this.setState({
      [e.target.name]: e.target.value
    } as Pick<IRegistroState, keyof IRegistroState>);
  };

  noValido = (): boolean => {
    const { usuario, password, nombre, rol, repetirPassword } = this.state;
    if (
      !usuario ||
      !password ||
      !nombre ||
      !rol ||
      password !== repetirPassword
    )
      return true;
    else return false;
  };

  handleOnSubmit = (e: React.FormEvent, crearUsuario: MutationFn) => {
    e.preventDefault();
    const { usuario, password, nombre, rol } = this.state;
    const input = {
      usuario,
      password,
      nombre,
      rol
    };
    crearUsuario({ variables: { input } }).then(data => {
      this.limpiarState();
      this.props.history.push("/login");
      // console.log(data);
    });
  };

  public render() {
    const { usuario, password, nombre, rol, repetirPassword } = this.state;
    const rolSession = this.props.session.getUsuario.rol;
    if (rolSession !== "ADMINISTRADOR")
      return <h2>No tiene permisos para registrar usuarios</h2>;
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Nuevo Usuario</h1>
        <div className="row  justify-content-center">
          <Mutation mutation={NUEVO_USUARIO}>
            {(
              crearUsuario: MutationFn,
              { loading, error, data }: MutationResult<IUsuario>
            ) => {
              return (
                <form
                  className="col-md-8"
                  onSubmit={e => this.handleOnSubmit(e, crearUsuario)}
                >
                  {error && <Error error={error.message} />}
                  <div className="form-group">
                    <label>Usuario</label>
                    <input
                      type="text"
                      name="usuario"
                      value={usuario}
                      className="form-control"
                      placeholder="Apodo del usuario"
                      required
                      onChange={this.handleOnChange}
                    />
                    <small className="form-text text-muted">
                      (Sin espacios y sin caracteres especiales)
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={nombre}
                      className="form-control"
                      placeholder="Nombre Completo del usuario"
                      required
                      onChange={this.handleOnChange}
                    />
                    <small className="form-text text-muted">
                      (El nombre y apellidos completo)
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Rol</label>
                    <select
                      name="rol"
                      value={rol}
                      onChange={this.handleOnChange}
                      className="form-control"
                    >
                      <option value="">Elegir...</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="VENDEDOR">VENDEDOR</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        className="form-control"
                        placeholder="Password"
                        onChange={this.handleOnChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Repetir Password</label>
                      <input
                        type="password"
                        name="repetirPassword"
                        value={repetirPassword}
                        className="form-control"
                        required
                        placeholder="Repetir Password"
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success float-right"
                    disabled={loading || this.noValido()}
                  >
                    Crear Usuario
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}

export default Registro;
