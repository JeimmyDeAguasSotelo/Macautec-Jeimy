import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ServicioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarServicio = this.borrarServicio.bind(this);
    }

    borrarServicio() {
        axios.delete('http://localhost:4000/servicios/borrar-servicio/' + this.props.obj._id)
            .then((res) => {
                console.log('Servicio borrado con exito!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.nombre}</td>
                <td>{this.props.obj.estado}</td>
                <td>{this.props.obj.descripcion}</td>
                <td>{this.props.obj.costo}</td>
                <td>{this.props.obj.duracionhoras}</td>
                <td>
                    <Link className="edit-link" to={"/editar-servicio/" + this.props.obj._id}>
                        Editar
                    </Link>
                    <Button onClick={this.borrarServicio} size="sm" variant="danger">Borrar</Button>
                </td>
            </tr>
        );
    }
}