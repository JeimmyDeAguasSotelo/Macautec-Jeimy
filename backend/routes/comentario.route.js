let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Modelo Cita
let comentarioSchema = require('../models/Comentario');

// CREAR comentario
router.route('/crear-comentario').post((req, res, next) => {
  comentarioSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// Obtener todos los comentarios de una cita por id
router.route('/:id').get((req, res) => {
  comentarioSchema.find({'cita._id' : req.params.id },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Borrar Cita
router.route('/borrar-comentario/:id').delete((req, res, next) => {
  comentarioSchema.findByIdAndRemove(req.params.id, (error, data) => {
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