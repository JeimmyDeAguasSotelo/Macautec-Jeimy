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
  placavehiculo: {
    type: String
  },
}, {
    collection: 'cita'
  })

module.exports = mongoose.model('Cita', citaSchema)