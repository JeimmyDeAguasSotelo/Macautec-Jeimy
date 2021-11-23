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
    this.onChangeMecanicoServicio = this.onChangeMecanicoServicio.bind(this);
    this.onChangeDescripcionServicio = this.onChangeDescripcionServicio.bind(this);
    this.onChangeCostoServicio = this.onChangeCostoServicio.bind(this);
    this.onChangeDuracionhorasServicio = this.onChangeDuracionhorasServicio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: '',
      estado: '',
      mecanico:{},
      descripcion: '',
      costo: '',
      duracionhoras: '',
      mecanicos:[]
    }
    
  }

  componentDidMount() {
    axios.get('http://localhost:4000/usuarios/mecanicos').then(res => {
  
      var data = res.data      
      var i ;
      var mecs = []
      for(i=0; i < data.length; i++){
        mecs.push({ value: data[i]._id, label: data[i].nombre });
        
      }
      this.setState({
        mecanicos: mecs
      });
    });
    
  }

  onChangeNombreServicio(e) {
    this.setState({ nombre: e.target.value })
  }

  onChangeEstadoServicio(e) {
    this.setState({ estado: e.target.value })
  }

  onChangeMecanicoServicio(e) {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    this.setState({ mecanico: {value: e.target.value, label:label} })
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
      mecanico: this.state.mecanico,
      descripcion: this.state.descripcion,
      costo: this.state.costo,
      duracionhoras: this.state.duracionhoras
    };

    axios.post('http://localhost:4000/servicios/crear-servicio', ServicioObject)
      .then(res => console.log(res.data));
      this.props.history.push('/servicios');
      //window.location.reload();
    this.setState({
      nombre: '',
      estado: '',
      mecanico: '',
      descripcion: '',
      costo: '',
      duracionhoras: '',
      mecanicos:this.state.mecanicos
    });
    
  }

  render() {

    const { mecanicos } = this.state;

    let mecsList = mecanicos.length > 0
      && mecanicos.map((item, i) => {
      return (
        <option key={i} value={item.value}>{item.label}</option>
      )
    }, this);


    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        
        <div className="form-group" >
          <label>
            <strong>Nombre</strong>
            </label>
            <br></br>
              <select value={this.state.nombre} onChange={this.onChangeNombreServicio} required>
                <option>Seleccione</option>
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

        <Form.Group controlId="Estado">
          <Form.Label><strong>Estado</strong></Form.Label>
          <br></br>
        
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
          
        </Form.Group>


        <div className="form-group" >
          <label>
            <strong>Mecanico</strong>
            </label>
            <br></br>
              <select className="form-select" value={this.state.mecanico.value} onChange={this.onChangeMecanicoServicio} required>
                <option>Seleccione</option>
                {mecsList}
              </select>
            
        </div>

        <Form.Group controlId="Descripcion">
          <Form.Label><strong>Descripcion</strong></Form.Label>
          <Form.Control type="text" value={this.state.descripcion} onChange={this.onChangeDescripcionServicio} required/>
        </Form.Group>

        <Form.Group controlId="Costo">
          <Form.Label><strong>Costo</strong></Form.Label>
          <Form.Control type="number" value={this.state.costo} onChange={this.onChangeCostoServicio} required/>
        </Form.Group>

        <Form.Group controlId="Duracionhoras">
          <Form.Label><strong>Duracion horas</strong></Form.Label>
          <Form.Control type="number" value={this.state.duracionhoras} onChange={this.onChangeDuracionhorasServicio} required/>
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit">
          Crear Servicio
        </Button>
      </Form>
    </div>);
  }
}
