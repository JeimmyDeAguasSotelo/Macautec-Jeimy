import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CrearUsuario from "./components/crear-usuario.component";
import EditarUsuario from "./components/editar-usuario.component";
import ListaUsuarios from "./components/lista-usuarios.component";

import CrearServicio from "./components/crear-servicio.component";
import EditarServicio from "./components/editar-servicio.component";
import ListaServicio from "./components/lista-servicios.component";

import CrearCita from "./components/crear-cita.component";
import EditarCita from "./components/editar-cita.component";
import ListaCita from "./components/lista-cita.component";


function App() {
  return (<Router>    
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Macautec
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/crear-usuario"} className="nav-link">
                  Crear Usuario
                </Link>
              </Nav>
              <Nav>
                <Link to={"/usuarios"} className="nav-link">
                  Lista Usuarios
                </Link>
              </Nav>
              <Nav>
                <Link to={"/crear-servicio"} className="nav-link">
                  Crear Servicio
                </Link>
              </Nav>
              <Nav>
                <Link to={"/servicios"} className="nav-link">
                  Lista Servicios
                </Link>
              </Nav>
              <Nav>
                <Link to={"/crear-cita"} className="nav-link">
                  Crear Cita
                </Link>
              </Nav>
              <Nav>
                <Link to={"/citas"} className="nav-link">
                  Lista Citas
                </Link>
              </Nav>              
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CrearUsuario} />
                <Route path="/crear-usuario/" component={CrearUsuario} />
                <Route path="/editar-usuario/:id" component={EditarUsuario} />
                <Route path="/usuarios/" component={ListaUsuarios} />
                <Route path="/crear-servicio/" component={CrearServicio} />
                <Route path="/editar-servicio/:id" component={EditarServicio} />
                <Route path="/servicios/" component={ListaServicio} />
                <Route path="/crear-cita/" component={CrearCita} />
                <Route path="/editar-cita/:id" component={EditarCita} />
                <Route path="/citas/" component={ListaCita} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;