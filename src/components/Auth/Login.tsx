import React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { AUTENTICAR_USUARIO } from "../../data/mutations";
import { IUsuario, IDataAutenticar } from "../../data/types";
import { RouteComponentProps } from "react-router";
import Error from "../Alertas/Error";

export interface ILoginProps extends RouteComponentProps {}

export interface ILoginState {
  usuario: string;
  password: string;
}

const initialState: ILoginState = {
  usuario: "",
  password: ""
};

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
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
    } as Pick<ILoginState, keyof ILoginState>);
  };

  noValido = (): boolean => {
    const { usuario, password } = this.state;
    if (!usuario || !password) return true;
    else return false;
  };

  // handleOnSubmit = (e: React.FormEvent, autenticarUsuario: MutationFn) => {
  //   e.preventDefault();
  //   const { usuario, password } = this.state;
  //   const input = {
  //     usuario,
  //     password
  //   };
  //   autenticarUsuario({ variables: { input } }).then(data => {
  //     this.limpiarState();
  //     this.props.history.push("/productos");

  //     console.log(data);
  //   });
  // };

  handleOnSubmit = async (
    e: React.FormEvent,
    autenticarUsuario: MutationFn
  ) => {
    e.preventDefault();
    const { usuario, password } = this.state;
    const input = {
      usuario,
      password
    };
    const response = await autenticarUsuario({ variables: { input } });
    if (!response) return null;
    const data: IDataAutenticar = response.data;
    localStorage.setItem("token", data.autenticarUsuario.token);
    this.limpiarState();
    this.props.history.push("/productos");
  };

  public render() {
    const { usuario, password } = this.state;
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">
          <Mutation mutation={AUTENTICAR_USUARIO}>
            {(
              autenticarUsuario: MutationFn,
              { loading, error, data }: MutationResult<IUsuario>
            ) => {
              return (
                <form
                  className="col-md-8"
                  onSubmit={e => this.handleOnSubmit(e, autenticarUsuario)}
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
                  <button
                    type="submit"
                    className="btn btn-success float-right"
                    disabled={loading || this.noValido()}
                  >
                    Iniciar Sesión
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

export default Login;
