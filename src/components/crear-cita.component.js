import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CrearCita extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeServicio = this.onChangeServicio.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeHora = this.onChangeHora.bind(this);
    this.onChangePlacaVehiculo = this.onChangePlacaVehiculo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      servicio: '',
      fecha: '',
      hora: '',
      placavehiculo: ''      
    }
  }

  onChangeServicio(e) {
    this.setState({ servicio: e.target.value })
  }

  onChangeFecha(e) {
    this.setState({ fecha: e.target.value })
  }

  onChangeHora(e) {
    this.setState({ hora: e.target.value })
  }

  onChangePlacaVehiculo(e) {
    this.setState({ placavehiculo: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const CitaObject = {
      servicio: this.state.servicio,
      fecha: this.state.fecha,
      estado: 'Agendada',
      hora: this.state.hora,
      placavehiculo: this.state.placavehiculo
    };

    axios.post('http://localhost:4000/citas/crear-cita', CitaObject)
      .then(res => console.log(res.data));
      this.props.history.push('/citas');
      window.location.reload();
    this.setState({
      servicio: '',
      fecha: '',
      hora: '',
      placavehiculo: ''
    });

  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        
        <div className="form-group" >
          <label>
            <strong>Servicio</strong>
            </label>
            <br></br>
              <select value={this.state.servicio} onChange={this.onChangeServicio} required>
                <option value="">Seleccione</option>
                <option value="Revisión de frenos">Revisión de frenos</option>
                <option value="Pastillas">Pastillas</option>
                <option value="Discos">Discos</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Amortiguadores">Amortiguadores</option>
                <option value="Cambio de aceite">Cambio de aceite</option>
                <option value="Alineación">Alineación</option>
                <option value="Rotación de llantas">Rotación de llantas</option>
              </select>
        </div>

        <Form.Group controlId="Fecha">
          <Form.Label><strong>Fecha</strong></Form.Label>
          <Form.Control type="Date" value={this.state.fecha} onChange={this.onChangeFecha} required/>
        </Form.Group>

        <div className="form-group" >
          <label>
            <strong>Hora</strong>
            </label>
            <br></br>
              <select value={this.state.hora} onChange={this.onChangeHora} required>
                <option value="">Seleccione</option>
                <option value="8">8:00 am</option>
                <option value="9">9:00 am</option>
                <option value="10">10:00 am</option>
                <option value="11">11:00 am</option>
                <option value="12">12:00 pm</option>
                <option value="13">1:00 pm</option>
                <option value="14">2:00 pm</option>
                <option value="15">3:00 pm</option>
                <option value="16">4:00 pm</option>
                <option value="17">5:00 pm</option>
              </select>
        </div>

        <Form.Group controlId="Descripcion">
          <Form.Label><strong>Placa Vehiculo</strong></Form.Label>
          <Form.Control type="text" value={this.state.placavehiculo} onChange={this.onChangePlacaVehiculo} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Cita
        </Button>
      </Form>
    </div>);
  }
}
