let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Modelo Cita
let citaSchema = require('../models/Cita');

// CREAR Cita
router.route('/crear-cita').post((req, res, next) => {
  citaSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// Obtener todos las Citas
router.route('/').get((req, res) => {
  citaSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Obtener las Citas de un servicio
router.route('/:servicio').get((req, res) => {
  citaSchema.find({ 'servicio.nombre' : req.params.servicio },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Obtener unico Cita
router.route('/editar-cita/:id').get((req, res) => {
  citaSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Editar Cita
router.route('/editar-cita/:id').put((req, res, next) => {
  citaSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Cita editada correctamente !')
    }
  })
})

// Borrar Cita
router.route('/borrar-cita/:id').delete((req, res, next) => {
  citaSchema.findByIdAndRemove(req.params.id, (error, data) => {
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