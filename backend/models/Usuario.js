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
  },
  password: {
    type: String
  }
}, {
    collection: 'usuario'
  })

module.exports = mongoose.model('Usuario', usuarioSchema)