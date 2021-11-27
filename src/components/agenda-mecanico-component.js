import React from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import axios from 'axios';

//https://github.com/revln9/react-agenda AQUI LA GUIA PARA LA AGENDA

require('moment/locale/es.js')

var filtroColor = {
  "Revisión de frenos":"0",
  "Pastillas":"1",
  "Discos":"2",
  "Suspensión":"3",
  "Amortiguadores":"4",
  "Cambio de aceite":"5",
  "Alineación":"6",
  "Rotación de llantas":"7"
}

//saque los colores de aca .
//https://www.rapidtables.com/web/color/RGB_Color.html
var colors= {
  '0':"rgba(102, 195, 131 , 1)" ,
  "1":"rgba(242, 177, 52, 1)" ,
  "2":"rgba(235, 85, 59, 1)" ,
  "3":"rgba(102, 102, 255, 1)" ,
  "4":"rgba(102, 255, 102, 1)" ,
  "5":"rgba(255, 255, 102, 1)" ,
  "6":"rgba(255, 153, 51, 1)" ,
  "7":"rgba(102, 255, 178, 1)" 
}

var now = new Date();
var items = [];

var items3 = [
  {
    _id            : guid(),
    name          : 'Servicio 1, Mecanico 1',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
    _id            : guid(),
    name          : 'Servicio 3, Mecanico 4',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 30),
    classes       : 'color-1 color-2'
  },
  {
    _id            : guid(),
    name          : 'Servicio 5, Lucas',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 9, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 12, 0),
    classes       : 'color-2 color-3'
  },
  {
    _id            : guid(),
    name          : 'Servicio 55, Jeimy',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 14, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 14, 30),
    classes       : 'color-3'
  }

];

export default class AgendaMecanico extends React.Component {
    constructor(props){
    super(props);
    
      console.log(this.props.match.params.id)

      axios.get('http://localhost:4000/citas/mecanico/'+this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        var data = res.data;         
        var items = []
        
        for(var i=0; i < data.length; i++){

          var dat = data[i].fecha;
          dat = dat.split('T');
          dat = dat[0].split('-');

          var fechaAgendaInicio = new Date(dat[0],dat[1] - 1,dat[2],data[i].hora);
          var fechaAgendaFin = new Date(dat[0],dat[1] - 1,dat[2],parseInt(data[i].hora) + parseInt(data[i].servicio.duracionhoras));

          var agendaItem = { 
            _id:guid(), 
            id: data[i]._id, 
            name: data[i].servicio.nombre + ': '+data[i].servicio.mecanico.label, 
            startDateTime: fechaAgendaInicio,
            endDateTime   : fechaAgendaFin,
            classes : filtroColor[data[i].servicio.nombre]
          }
          console.log(agendaItem)
          items.push(agendaItem);

          
        }        
        this.setState({
          items: items
        });
      })
      .catch((error) => {
        console.log(error);
      })

      this.state = {
        items:items,
        selected:[],
        cellHeight:30,
        showModal:false,
        locale:"es",
        rowsPerHour:2,
        numberOfDays:5,
        startDate: new Date()
      }
      this.handleCellSelection = this.handleCellSelection.bind(this)
      this.handleItemEdit = this.handleItemEdit.bind(this)
      this.handleRangeSelection = this.handleRangeSelection.bind(this)
    }
  
  handleCellSelection(item){
    console.log('handleCellSelection',item)
  }
  handleItemEdit(item){
    console.log('handleItemEdit', item)
  }
  handleRangeSelection(item){
    console.log('handleRangeSelection', item)
  }
    render() {
      return (
        <div>
          <ReactAgenda
            minDate={new Date(now.getFullYear(), now.getMonth()-3, now.getDate())}
            maxDate={new Date(now.getFullYear(), now.getMonth()+3, now.getDate())}
            disablePrevButton={false}
            startDate={this.state.startDate}
            cellHeight={this.state.cellHeight}
            locale={this.state.locale}
            items={this.state.items}
            numberOfDays={this.state.numberOfDays}
            rowsPerHour={this.state.rowsPerHour}
            itemColors={colors}
            autoScale={false}
            fixedHeader={true}
            onItemEdit={this.handleItemEdit.bind(this)}
            onCellSelect={this.handleCellSelection.bind(this)}
            onRangeSelection={this.handleRangeSelection.bind(this)}/>
        </div>
      );
    }
  }