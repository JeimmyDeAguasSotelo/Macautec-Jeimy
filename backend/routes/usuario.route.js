let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Modelo usuario
let usuarioSchema = require('../models/Usuario');

// CREAR Usuario
router.route('/crear-usuario').post((req, res, next) => {
  usuarioSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// Obtener todos los Usuarios
router.route('/').get((req, res) => {
  usuarioSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Obtener unico Usuario
router.route('/editar-usuario/:id').get((req, res) => {
  usuarioSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Editar Usuario
router.route('/editar-usuario/:id').put((req, res, next) => {
  usuarioSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Usuario editado correctamente !')
    }
  })
})

// Borrar Usuario
router.route('/borrar-usuario/:id').delete((req, res, next) => {
  usuarioSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;