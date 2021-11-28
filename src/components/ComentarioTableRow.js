import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ComentarioTableRow extends Component {

    constructor(props) {
        super(props);
        this.borrarComentario = this.borrarComentario.bind(this);
    }

    borrarComentario() {
        axios.delete('http://localhost:4000/comentarios/borrar-comentario/' + this.props.obj._id)
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
                <td>{this.props.obj.comentario}</td>                
                <td>{this.props.obj.fecha.split('T')[0]}</td>                
                <td>                   
                    <Button onClick={this.borrarComentario} className="btn btn-danger" variant="danger">Borrar</Button>
                </td>
            </tr>
        );
    }
}