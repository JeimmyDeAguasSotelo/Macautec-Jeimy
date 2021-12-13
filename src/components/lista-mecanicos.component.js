import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UsuarioTableRow from './UsuarioTableRow';


export default class ListaUsuarios extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usuarios: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/usuarios/mecanicos/')
      .then(res => {
        this.setState({
          usuarios: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.usuarios.map((res, i) => {
      return <UsuarioTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Cedula</th>
            <th>Tipo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}