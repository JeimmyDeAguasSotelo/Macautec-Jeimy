import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CitaComentariosTableRow extends Component {

    constructor(props) {
        super(props);
       
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
                </td>
            </tr>
        );
    }
}