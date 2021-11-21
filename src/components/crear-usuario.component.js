import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CrearUsuario extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
    this.onChangeEmailUsuario = this.onChangeEmailUsuario.bind(this);
    this.onChangeTipoUsuario = this.onChangeTipoUsuario.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: '',
      email: '',
      tipo: ''
    }
  }

  onChangeNombreUsuario(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangeEmailUsuario(e) {
    this.setState({ email: e.target.value })
  }

  onChangeTipoUsuario(e) {
    this.setState({ tipo: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const usuarioObject = {
      nombre: this.state.nombre,
      email: this.state.email,
      tipo: this.state.tipo
    };

    axios.post('http://localhost:4000/usuarios/crear-usuario', usuarioObject)
      .then(res => console.log(res.data));
      this.props.history.push('/usuarios');
      window.location.reload();
    this.setState({
      nombre: '',
      email: '',
      tipo: ''
    });

  }

  render() {
    return (<div classnombre="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombreUsuario} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmailUsuario} />
        </Form.Group>

        <Form.Group controlId="Tipo">
          <Form.Label>Tipo</Form.Label>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          
        </Form.Group>

        <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesTipo"
                id="Planta"
                value="Planta"
                checked={this.state.tipo === "Planta"}
                onChange={this.onChangeTipoUsuario}
                required
              />
              <label className="form-check-label">Planta</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="OpcionesTipo"
                id="Mecanico"
                value="Mecanico"
                checked={this.state.tipo === "Mecanico"}
                onChange={this.onChangeTipoUsuario}
              />
              <label className="form-check-label">Mecanico</label>
            </div>
          </div>

        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Usuario
        </Button>
      </Form>
    </div>);
  }
}
