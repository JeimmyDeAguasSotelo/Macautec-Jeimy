import React from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';

//https://github.com/revln9/react-agenda AQUI LA GUIA PARA LA AGENDA

require('../../node_modules/moment/locale/es.js')

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}

var now = new Date();

var items = [
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

export default class Agenda extends React.Component {
    constructor(props){
    super(props);
      this.state = {
        items:items,
        selected:[],
        cellHeight:30,
        showModal:false,
        locale:"es",
        rowsPerHour:2,
        numberOfDays:5,
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()-1)
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