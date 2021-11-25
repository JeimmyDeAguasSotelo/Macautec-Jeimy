let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const usuarioRoute = require('../backend/routes/usuario.route')
const servicioRoute = require('../backend/routes/servicio.route')
const citaRoute = require('../backend/routes/cita.route')
//const loginRoute = require('../backend/routes/login.route')

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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/usuarios', usuarioRoute)
app.use('/servicios', servicioRoute)
app.use('/citas', citaRoute)
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
