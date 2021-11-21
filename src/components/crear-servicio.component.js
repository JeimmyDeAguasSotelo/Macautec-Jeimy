import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CrearServicio extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeNombreServicio = this.onChangeNombreServicio.bind(this);
    this.onChangeEstadoServicio = this.onChangeEstadoServicio.bind(this);
    this.onChangeDescripcionServicio = this.onChangeDescripcionServicio.bind(this);
    this.onChangeCostoServicio = this.onChangeCostoServicio.bind(this);
    this.onChangeDuracionhorasServicio = this.onChangeDuracionhorasServicio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: '',
      estado: '',
      descripcion: '',
      costo: '',
      duracionhoras: ''
    }
  }

  onChangeNombreServicio(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangeEstadoServicio(e) {
    this.setState({ estado: e.target.value })
  }

  onChangeDescripcionServicio(e) {
    this.setState({ descripcion: e.target.value })
  }

  onChangeCostoServicio(e) {
    this.setState({ costo: e.target.value })
  }

  onChangeDuracionhorasServicio(e) {
    this.setState({ duracionhoras: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const ServicioObject = {
      nombre: this.state.nombre,
      estado: this.state.estado,
      descripcion: this.state.descripcion,
      costo: this.state.costo,
      duracionhoras: this.state.duracionhoras
    };

    axios.post('http://localhost:4000/servicios/crear-servicio', ServicioObject)
      .then(res => console.log(res.data));
      this.props.history.push('/servicios');
      window.location.reload();
    this.setState({
      nombre: '',
      estado: '',
      descripcion: '',
      costo: '',
      duracionhoras: ''
    });

  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombreServicio} required/>
        </Form.Group>

        <Form.Group controlId="Estado">
          <Form.Label>Estado</Form.Label>
        </Form.Group>

        <div className="form-group" >
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Disponible"
                value="Disponible"
                checked={this.state.estado === "Disponible"}
                onChange={this.onChangeEstadoServicio}
                required
              />
              <label className="form-check-label">Disponible</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="No Disponible"
                value="No Disponible"
                checked={this.state.estado === "No Disponible"}
                onChange={this.onChangeEstadoServicio}
              />
              <label className="form-check-label">No Disponible</label>
            </div>
          </div>


        <Form.Group controlId="Descripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" value={this.state.descripcion} onChange={this.onChangeDescripcionServicio} required/>
        </Form.Group>

        <Form.Group controlId="Costo">
          <Form.Label>Costo</Form.Label>
          <Form.Control type="number" value={this.state.costo} onChange={this.onChangeCostoServicio} required/>
        </Form.Group>

        <Form.Group controlId="Duracionhoras">
          <Form.Label>Duracion horas</Form.Label>
          <Form.Control type="number" value={this.state.duracionhoras} onChange={this.onChangeDuracionhorasServicio} required/>
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Servicio
        </Button>
      </Form>
    </div>);
  }
}
