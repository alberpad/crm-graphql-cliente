import gql from "graphql-tag";

export const GET_CLIENTES = gql`
  query getClientes($limite: Int, $offset: Int) {
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
      empresa
    }
    totalClientes
  }
`;

export const GET_CLIENTE = gql`
  query getClienteByID($id: ID) {
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      edad
      emails {
        email
      }
      tipo
    }
  }
`;
