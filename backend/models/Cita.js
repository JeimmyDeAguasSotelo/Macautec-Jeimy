const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let citaSchema = new Schema({
  servicio: {
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
  comentarios: {
    type: Object
  }
}, {
    collection: 'cita'
  })

module.exports = mongoose.model('Cita', citaSchema)