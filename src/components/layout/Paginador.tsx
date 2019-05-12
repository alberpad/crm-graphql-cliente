import * as React from "react";

export interface IPaginadorProps {
  actual: number;
  totalClientes: number;
  limitePaginas: number;
  paginaAnterior: () => void;
  paginaSiguiente: () => void;
}

export interface IPaginadorState {
  paginador: {
    paginas: number;
  };
}

export default class Paginador extends React.Component<
  IPaginadorProps,
  IPaginadorState
> {
  constructor(props: IPaginadorProps) {
    super(props);

    this.state = {
      paginador: {
        paginas: Math.ceil(this.props.totalClientes / this.props.limitePaginas)
      }
    };
  }

  public render() {
    const { actual } = this.props;
    const btnAnterior =
      actual > 1 ? (
        <button
          type="button"
          onClick={this.props.paginaAnterior}
          className="btn btn-primary mr-2"
        >
          &laquo; Anterior
        </button>
      ) : (
        ""
      );
    const { paginas } = this.state.paginador;
    const btnSiguiente =
      actual !== paginas ? (
        <button
          type="button"
          onClick={this.props.paginaSiguiente}
          className="btn btn-primary"
        >
          Siguiente
        </button>
      ) : (
        ""
      );

    return (
      <div className="mt-5 d-flex justify-content-center">
        {btnAnterior}
        {""}
        {btnSiguiente}
      </div>
    );
  }
}
