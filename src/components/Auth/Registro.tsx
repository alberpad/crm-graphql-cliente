import React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { NUEVO_USUARIO } from "../../data/mutations";
import { IUsuario } from "../../data/types";
import { RouteComponentProps } from "react-router";
import Error from "../Alertas/Error";

export interface IRegistroProps extends RouteComponentProps {}

export interface IRegistroState {
  usuario: string;
  password: string;
  repetirPassword: string;
}

const initialState: IRegistroState = {
  usuario: "",
  password: "",
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

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    } as Pick<IRegistroState, keyof IRegistroState>);
  };

  noValido = (): boolean => {
    const { usuario, password, repetirPassword } = this.state;
    if (!usuario || !password || password !== repetirPassword) return true;
    else return false;
  };

  handleOnSubmit = (e: React.FormEvent, crearUsuario: MutationFn) => {
    e.preventDefault();
    const { usuario, password } = this.state;
    const input = {
      usuario,
      password
    };
    crearUsuario({ variables: { input } }).then(data => {
      this.limpiarState();
      this.props.history.push("/login");
      console.log(data);
    });
  };

  public render() {
    const { usuario, password, repetirPassword } = this.state;
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
                      placeholder="Nombre Usuario"
                      required
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
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
