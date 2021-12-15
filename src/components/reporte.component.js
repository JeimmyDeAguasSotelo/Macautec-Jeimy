import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import CitaReporteTableRow from './CitaReporteTableRow';

export default class Reportes extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeFechadesde = this.onChangeFechadesde.bind(this);
    this.onChangeFechahasta = this.onChangeFechahasta.bind(this);

    var dentro_un_mes = new Date();
    dentro_un_mes.setMonth(dentro_un_mes.getMonth()+1);
    dentro_un_mes = dentro_un_mes.toISOString().split('T')[0];
    console.log(dentro_un_mes)

    var hace_un_mes = new Date();
    hace_un_mes.setMonth(hace_un_mes.getMonth()-1);
    hace_un_mes = hace_un_mes.toISOString().split('T')[0];
    console.log(hace_un_mes)

    this.state = {
      fecha_desde: hace_un_mes,
      fecha_hasta: dentro_un_mes,
      servicio_mas: {},
      servicio_menos: {},
      servicios_completos: 0,      
      lista_asignaciones: [],
      filtrados: []
    };
    
  }
  
  onChangeFechadesde(e) {
    this.setState({ fecha_desde: e.target.value })
    this.componentDidMount()
  }

  onChangeFechahasta(e) {
    this.setState({ fecha_hasta: e.target.value })
    this.componentDidMount()
  }

  componentDidMount() {
    axios.get('http://localhost:4000/citas/servicio-mas-solicitado/'+this.state.fecha_desde+'/'+this.state.fecha_hasta)
      .then(res => {
        this.setState({
          servicio_mas: {nombre : res.data[0]._id, conteo:res.data[0].conteo }
        });
        console.log(this.state.servicio_mas);
      })      
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:4000/citas/servicio-menos-solicitado/'+this.state.fecha_desde+'/'+this.state.fecha_hasta)
      .then(res => {
        this.setState({
          servicio_menos: {nombre : res.data[0]._id, conteo:res.data[0].conteo }
        });
        console.log(this.state.servicio_menos);
      })      
      .catch((error) => {
        console.log(error);
      });

      axios.get('http://localhost:4000/citas/servicios-completos/'+this.state.fecha_desde+'/'+this.state.fecha_hasta)
      .then(res => {
        this.setState({
          servicios_completos: res.data[0].conteo
        });
        console.log(this.state.servicios_completos);
      })      
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:4000/citas/servicios-mecanico-por-dia/'+this.state.fecha_desde+'/'+this.state.fecha_hasta)
      .then(res => {
        this.setState({
          lista_asignaciones: res.data
        });
        console.log(this.state.lista_asignaciones);
      })      
      .catch((error) => {
        console.log(error);
      });

  }

  DataTable() {
    return this.state.lista_asignaciones.map((res, i) => {
      return <CitaReporteTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div>

      <Table>
        <thead>
          <tr>
            <th><h1>Reportes</h1></th>            
          </tr>
        </thead>
      </Table>

      <Table>
        <thead>
          <tr>
            <td>
              <Form.Group controlId="Desde">
                <Form.Label><strong>Desde</strong></Form.Label>
                <Form.Control type="Date" value={this.state.fecha_desde} onChange={this.onChangeFechadesde} required/>
              </Form.Group>
            </td>
            <td>
              <Form.Group controlId="Hasta">
                <Form.Label><strong>Hasta</strong></Form.Label>
                <Form.Control type="Date" value={this.state.fecha_hasta} onChange={this.onChangeFechahasta} required/>
              </Form.Group>
            </td>            
          </tr>
        </thead>
      </Table>

      <Table>
        <thead>
          <tr>
            <td>
              <Form.Group controlId="ServicioMas">
                <Form.Label><strong>Servicio mas solicitado</strong></Form.Label>
                <div>
                  <Form.Label>{this.state.servicio_mas.nombre}{' '}</Form.Label>
                </div>
                <div>
                  <Form.Label><strong>Total:</strong> {this.state.servicio_mas.conteo}</Form.Label>
                </div>
              </Form.Group>
            </td>
            <td>
              <Form.Group controlId="ServicioMenos">
                <Form.Label><strong>Servicio menos solicitado</strong></Form.Label>
                <div>
                  <Form.Label>{this.state.servicio_menos.nombre}{' '}</Form.Label>
                </div>
                <div>
                  <Form.Label><strong>Total:</strong> {this.state.servicio_menos.conteo}</Form.Label>
                </div>
              </Form.Group>
            </td>
            <td>
              <Form.Group controlId="ServiciosCompletos">
                <Form.Label><strong>Servicios completos</strong></Form.Label>                
                <div>
                  <Form.Label><strong>Total:</strong> {this.state.servicios_completos}</Form.Label>
                </div>
              </Form.Group>
            </td>
          </tr>
        </thead>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><h2>Lista de Mecanicos y sus asignaciones por dia</h2></th>            
          </tr>
        </thead>
      </Table>
      {this.DataTable()}
    </div>);
  }
}