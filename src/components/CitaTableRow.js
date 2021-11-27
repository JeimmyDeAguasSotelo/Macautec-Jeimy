import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CitaTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarCita = this.borrarCita.bind(this);
    }

    borrarCita() {
        axios.delete('http://localhost:4000/citas/borrar-cita/' + this.props.obj._id)
            .then((res) => {
                console.log('Cita borrada con exito!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        
    }

    render() {


        return (
            <tr>
                <td>{this.props.obj.servicio.nombre}</td>
                <td>{this.props.obj.servicio.mecanico.label}</td>
                <td>{this.props.obj.servicio.duracionhoras}</td>
                <td>{this.props.obj.estado}</td>
                <td>{this.props.obj.fecha.split('T')[0]}</td>
                <td>{this.props.obj.hora+":00"}</td>
                <td>{this.props.obj.placavehiculo}</td>
                <td>
                    <Link className="btn btn-primary" to={"/agenda/" + this.props.obj.servicio.nombre}>
                        Agenda
                    </Link>
                    <Link className="btn btn-success" to={"/editar-cita/" + this.props.obj._id}>
                        Editar
                    </Link>
                    <Button onClick={this.borrarCita} className="btn btn-danger" variant="danger">Borrar</Button>
                </td>
            </tr>
        );
    }
}