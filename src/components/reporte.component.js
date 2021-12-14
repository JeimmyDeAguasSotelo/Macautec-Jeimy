import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class Reportes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      citas: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/citas/')
      .then(res => {
        this.setState({
          citas: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

 


  render() {
    return (<div>

      <Table>
        <thead>
          <tr>
            <th><h1>Reportes</h1></th>            
          </tr>
        </thead>
      </Table>
    </div>);
  }
}