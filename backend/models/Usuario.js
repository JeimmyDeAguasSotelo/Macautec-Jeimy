const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String
  },
  email: {
    type: String
  },
  tipo: {
    type: String
  }
}, {
    collection: 'usuarios'
  })

module.exports = mongoose.model('Usuario', usuarioSchema)