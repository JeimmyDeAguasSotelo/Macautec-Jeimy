const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comentarioSchema = new Schema({
  cita: {
    type: Object
  },
  comentario: {
    type: String
  },
  fecha: {
    type: Date
  }
}, {
    collection: 'comentario'
  })

module.exports = mongoose.model('Comentario', comentarioSchema)