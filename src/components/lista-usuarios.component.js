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
    axios.get('http://localhost:4000/usuarios/')
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
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
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