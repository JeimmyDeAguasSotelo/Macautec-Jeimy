let mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const usuarioRoute = require('../backend/routes/usuario.route')
const servicioRoute = require('../backend/routes/servicio.route')
const citaRoute = require('../backend/routes/cita.route')
const comentarioRoute = require('../backend/routes/comentario.route')


// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Conectado a la base de datos con exito!')
},
  error => {
    console.log('No se pudo conectar a la base de datos : ' + error)
  }
)

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//CORS
var whitelist = ['*','https://macautec-jeimy.vercel.app', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin: '+origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use('/usuarios', usuarioRoute)
app.use('/servicios', servicioRoute)
app.use('/citas', citaRoute)
app.use('/comentarios', comentarioRoute)
//app.use('/login', loginRoute)

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})



// 404 Error
app.use((req, res, next) => {
  console.log('404')
  //next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
