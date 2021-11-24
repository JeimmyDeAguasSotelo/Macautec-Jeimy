import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditarUsuario extends Component {

  constructor(props) {
    super(props)

    this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
    this.onChangeEmailUsuario = this.onChangeEmailUsuario.bind(this);
    this.onChangePasswordUsuario1 = this.onChangePasswordUsuario1.bind(this);
    this.onChangePasswordUsuario2 = this.onChangePasswordUsuario2.bind(this);
    this.onChangeTipoUsuario = this.onChangeTipoUsuario.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      nombre: '',
      email: '',
      password: '',
      password2: '',
      tipo: '',
      errors: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/usuarios/editar-usuario/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          nombre: res.data.nombre,
          email: res.data.email,
          tipo: res.data.tipo
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeNombreUsuario(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangePasswordUsuario1(e) {
    let errors = {};
    errors["password2"] = "";
    if(e.target.value !== this.state.password2){
      errors["password2"] = "Las contraseñas deben ser iguales.";
    }
    this.setState({errors: errors});
    this.setState({ password: e.target.value })
  }

  onChangePasswordUsuario2(e) {
    let errors = {};
    errors["password2"] = "";
    if(e.target.value !== this.state.password){
      errors["password2"] = "Las contraseñas deben ser iguales.";
    }
    this.setState({errors: errors});
    this.setState({ password2: e.target.value })
  }

  onChangeEmailUsuario(e) {
    this.setState({ email: e.target.value })
  }

  onChangeTipoUsuario(e) {
    this.setState({ tipo: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      nombre: this.state.nombre,
      email: this.state.email,
      password: this.state.password,
      tipo: this.state.tipo
    };

    axios.put('http://localhost:4000/usuarios/editar-usuario/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Usuario editado con exito')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/usuarios')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label><strong>Nombre</strong></Form.Label>
          <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombreUsuario} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmailUsuario} />
        </Form.Group>

        <Form.Group controlId="Password1">
          <Form.Label><strong>Contraseña</strong></Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangePasswordUsuario1} required/>
        </Form.Group>

        <Form.Group controlId="Password2">
          <Form.Label><strong>Repetir contraseña</strong></Form.Label>
          <Form.Control type="password" value={this.state.password2} onChange={this.onChangePasswordUsuario2} required/>
          <div className="text-danger">{this.state.errors.password2}</div>
        </Form.Group>

        <Form.Group controlId="Tipo">
          <Form.Label><strong>Tipo</strong></Form.Label>
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
          Editar Usuario
        </Button>
      </Form>
    </div>);
  }
}
