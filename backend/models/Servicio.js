const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicioSchema = new Schema({
  nombre: {
    type: String
  },
  estado: {
    type: String
  },
  mecanico: {
    type: String
  },
  descripcion: {
    type: String
  },
  costo: {
    type: String
  },
  duracionhoras: {
    type: Number
  }
}, {
    collection: 'servicio'
  })

module.exports = mongoose.model('Servicio', servicioSchema)