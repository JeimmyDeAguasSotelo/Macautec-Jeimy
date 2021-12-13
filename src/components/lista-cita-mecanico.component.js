import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CitaTableRow from './CitaTableRow';
import { Link } from 'react-router-dom';


export default class ListaCitas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      citas: []
    };
  }

  componentDidMount() {
    const session = localStorage.getItem('token');
    const sess = JSON.parse(session)
    //console.log(sess.usuario._id)
    axios.get('http://localhost:4000/citas/mecanico/'+sess.usuario._id)
      .then(res => {
        this.setState({
          citas: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.citas.map((res, i) => {
      return <CitaTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Mecanico</th>
            <th>Duracion</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Placa Vehiculo</th>
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