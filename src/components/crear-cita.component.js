import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CrearCita extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeServicio = this.onChangeServicio.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeHora = this.onChangeHora.bind(this);
    this.onChangePlacaVehiculo = this.onChangePlacaVehiculo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      servicio: {},
      estado: 'Agendada',
      fecha: '',
      hora: '',
      placavehiculo: '',
      servicios:[]
    }
  }

  onChangeServicio(e) {
    var found = false
    var i = 0
    while(!found && i < this.state.servicios.length){

      if(this.state.servicios[i]._id === e.target.value){
        this.setState({ servicio: this.state.servicios[i]})
        //console.log(this.state.servicios[i])
        found = true
      }
      i++
    }
  }

  onChangeFecha(e) {
    this.setState({ fecha: e.target.value })
  }
  
  onChangeEstado(e) {
    this.setState({ estado: e.target.value })
  }

  onChangeHora(e) {
    this.setState({ hora: e.target.value })
  }

  onChangePlacaVehiculo(e) {
    this.setState({ placavehiculo: e.target.value })
  }

  componentDidMount() {
    axios.get('http://localhost:4000/servicios/activos').then(res => {
      this.setState({
        servicios: res.data
      });
    });
    
  }

  onSubmit(e) {
    e.preventDefault()
    const CitaObject = {
      servicio: this.state.servicio,
      fecha: this.state.fecha,
      estado: this.state.estado,
      hora: this.state.hora,
      placavehiculo: this.state.placavehiculo
    };
    console.log(CitaObject)

    axios.post('http://localhost:4000/citas/crear-cita', CitaObject)
      .then(res => console.log(res.data));
      this.props.history.push('/citas');
      //window.location.reload();
    this.setState({
      servicio: {},
      fecha: '',
      estado: 'Agendada',
      hora: '',
      placavehiculo: '',
      servicios:this.state.servicios
    });

  }

  render() {

    const { servicios } = this.state;

    let servsList = servicios.length > 0
      && servicios.map((item, i) => {
      return (
        <option key={i} value={item._id}>{item.nombre +', '+item.mecanico.label+', '+item.duracionhoras}</option>
      )
    }, this);

    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        
        <div className="form-group" >
          <label>
            <strong>Servicio</strong>
            </label>
            <br></br>
              <select value={this.state.servicio._id} onChange={this.onChangeServicio} required>
                <option value="">Seleccione (Servicio, Mecanico, Estimado)</option>
                {servsList}
              </select>
        </div>

        <Form.Group controlId="Estado">
          <Form.Label><strong>Estado</strong></Form.Label>
        </Form.Group>
        <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Agendada"
                value="Agendada"
                checked={this.state.estado === "Agendada"}
                onChange={this.onChangeEstado}
                required
              />
              <label className="form-check-label">Agendada</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Cancelada"
                value="Cancelada"
                checked={this.state.estado === "Cancelada"}
                onChange={this.onChangeEstado}
              />
              <label className="form-check-label">Cancelada</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesEstado"
                id="Completa"
                value="Completa"
                checked={this.state.estado === "Completa"}
                onChange={this.onChangeEstado}
              />
              <label className="form-check-label">Completa</label>
            </div>
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
