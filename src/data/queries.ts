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

export const GET_PRODUCTOS = gql`
  query getProductos($limite: Int, $offset: Int, $stock: Boolean) {
    getProductos(limite: $limite, offset: $offset, stock: $stock) {
      id
      nombre
      precio
      stock
    }
    totalProductos
  }
`;

export const GET_PRODUCTO = gql`
  query getProducto($id: ID) {
    getProducto(id: $id) {
      id
      nombre
      precio
      stock
    }
  }
`;

export const GET_PEDIDOS = gql`
  query getPedidos($clienteId: String) {
    getPedidos(clienteId: $clienteId) {
      cliente
      fecha
      id
      estado
      total
      productos {
        id
        cantidad
      }
    }
  }
`;
