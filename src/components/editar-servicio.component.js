import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditarServicio extends Component {

  constructor(props) {
    super(props)

    this.onChangeNombreServicio = this.onChangeNombreServicio.bind(this);
    this.onChangeEstadoServicio = this.onChangeEstadoServicio.bind(this);
    this.onChangeDescripcionServicio = this.onChangeDescripcionServicio.bind(this);
    this.onChangeCostoServicio = this.onChangeCostoServicio.bind(this);
    this.onChangeDuracionhorasServicio = this.onChangeDuracionhorasServicio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      nombre: '',
      estado: '',
      descripcion: '',
      costo: '',
      duracionhoras: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/servicios/editar-servicio/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          nombre: res.data.nombre,
          estado: res.data.estado,
          descripcion: res.data.descripcion,
          costo: res.data.costo,
          duracionhoras: res.data.duracionhoras
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

    const servicioObject = {
      nombre: this.state.nombre,
      estado: this.state.estado,
      descripcion: this.state.descripcion,
      costo: this.state.costo,
      duracionhoras: this.state.duracionhoras
    };

    axios.put('http://localhost:4000/servicios/editar-servicio/' + this.props.match.params.id, servicioObject)
      .then((res) => {
        console.log(res.data)
        console.log('Servicio editado con exito')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/servicios')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombreServicio} />
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
          <Form.Control type="text" value={this.state.descripcion} onChange={this.onChangeDescripcionServicio} />
        </Form.Group>

        <Form.Group controlId="Costo">
          <Form.Label>Costo</Form.Label>
          <Form.Control type="number" value={this.state.costo} onChange={this.onChangeCostoServicio} />
        </Form.Group>

        <Form.Group controlId="Duracionhoras">
          <Form.Label>Duracion horas</Form.Label>
          <Form.Control type="number" value={this.state.duracionhoras} onChange={this.onChangeDuracionhorasServicio} />
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Servicio
        </Button>
      </Form>
    </div>);
  }
}
