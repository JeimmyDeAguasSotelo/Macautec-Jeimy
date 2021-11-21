import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UsuarioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarUsuario = this.borrarUsuario.bind(this);
    }

    borrarUsuario() {
        axios.delete('http://localhost:4000/usuarios/borrar-usuario/' + this.props.obj._id)
            .then((res) => {
                console.log('Usuario borrado con exito!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.nombre}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.tipo}</td>
                <td>
                    <Link className="edit-link" to={"/editar-usuario/" + this.props.obj._id}>
                        Editar
                    </Link>
                    <Button onClick={this.borrarUsuario} size="sm" variant="danger">Borrar</Button>
                </td>
            </tr>
        );
    }
}