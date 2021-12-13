import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ServicioTableRow from './ServicioTableRow';


export default class ListaServicios extends Component {

  constructor(props) {
    super(props)
    this.state = {
      servicios: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/servicios/')
      .then(res => {
        this.setState({
          servicios: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.servicios.map((res, i) => {
      return <ServicioTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>            
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Duracion horas</th>
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