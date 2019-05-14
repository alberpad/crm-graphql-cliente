import React from "react";

export interface IWithPaginatorProps {}

export interface IWithPaginatorState {
  paginador: {
    offset: number;
    actual: number;
  };
}

function withPaginador<P extends IWithPaginatorProps>(
  paginas: number,
  WrappedComponent: React.ComponentType<P>
) {
  return class extends React.Component<
    IWithPaginatorProps,
    IWithPaginatorState
  > {
    constructor(props: IWithPaginatorProps) {
      super(props);

      this.state = {
        paginador: {
          offset: 0,
          actual: 1
        }
      };
    }

    limitePaginas = paginas;

    paginaAnterior = () => {
      this.setState({
        paginador: {
          offset: this.state.paginador.offset - this.limitePaginas,
          actual: this.state.paginador.actual - 1
        }
      });
    };

    paginaSiguiente = () => {
      this.setState({
        paginador: {
          offset: this.state.paginador.offset + this.limitePaginas,
          actual: this.state.paginador.actual + 1
        }
      });
    };

    public render() {
      const paginadorProp = {
        actual: this.state.paginador.actual,
        offset: this.state.paginador.offset,
        limitePaginas: this.limitePaginas,
        paginaAnterior: this.paginaAnterior,
        paginaSiguiente: this.paginaSiguiente
      };
      return (
        <WrappedComponent paginador={paginadorProp} {...this.props as P} />
      );
    }
  };
}

export default withPaginador;
