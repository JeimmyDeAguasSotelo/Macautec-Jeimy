const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let citaSchema = new Schema({
  servicio: {
    type: Object
  },
  mecanico: {
    type: Object
  },  
  estado: {
    type: String
  },
  fecha: {
    type: Date
  },
  hora: {
    type: Number
  },
  nombre: {
    type: String
  },
  cedula: {
    type: Number
  },
  email: {
    type: String
  },
  telefono: {
    type: Number
  },
  placavehiculo: {
    type: String
  },
  comentarios: {
    type: Object
  }
}, {
    collection: 'cita'
  })

module.exports = mongoose.model('Cita', citaSchema)