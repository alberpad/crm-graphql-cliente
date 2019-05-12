import gql from "graphql-tag";

export const GET_PRODUCTOS = gql`
  query getProductos($limite: Int, $offset: Int) {
    getProductos(limite: $limite, offset: $offset) {
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
