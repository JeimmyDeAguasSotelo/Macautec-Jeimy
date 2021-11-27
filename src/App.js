import React  from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CrearUsuario from "./components/crear-usuario.component";
import EditarUsuario from "./components/editar-usuario.component";
import ListaUsuarios from "./components/lista-usuarios.component";

import Agenda from "./components/agenda-component";
import AgendaServicio from "./components/agenda-servicio-component";

import CrearServicio from "./components/crear-servicio.component";
import EditarServicio from "./components/editar-servicio.component";
import ListaServicio from "./components/lista-servicios.component";

import CrearCita from "./components/crear-cita.component";
import EditarCita from "./components/editar-cita.component";
import ListaCita from "./components/lista-cita.component";
//agregue login session siguendo esta guia
//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import Login from './components/login.component';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  const logout = () => {
    localStorage.clear();
    // you can also like localStorage.removeItem('Token');
    window.location.href = "/login";
  }

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
                <Menu menuButton={<MenuButton>Planta</MenuButton>}>
                  <SubMenu label="Servicios">
                    <MenuItem onClick={() => window.location = "/servicios"}>Lista</MenuItem>
                    <MenuItem onClick={() => window.location = "/crear-servicio"}>Nuevo</MenuItem>
                  </SubMenu>
                  <SubMenu label="Citas">
                    <MenuItem onClick={() => window.location = "/citas"}>Lista</MenuItem>
                    <MenuItem onClick={() => window.location = "/crear-cita"}>Nuevo</MenuItem>
                  </SubMenu>
                  <MenuItem onClick={() => window.location = "/agenda/"}>Agenda</MenuItem>
                  <SubMenu label="Reportes">
                    <MenuItem onClick={() => window.location = "/servicio-mas"}>Servico mas solicitado</MenuItem>
                    <MenuItem onClick={() => window.location = "/servicio-menos"}>Servicio menos solicitado</MenuItem>
                    <MenuItem onClick={() => window.location = "/asignaciones-mecanicos"}>Asignaciones mecanicos</MenuItem>
                    <MenuItem onClick={() => window.location = "/servicios-completados"}>Servicios completados</MenuItem>
                  </SubMenu>

                </Menu>
              </Nav>

              <Nav>
                <Menu menuButton={<MenuButton>Mecanico</MenuButton>}>
                  
                  <MenuItem onClick={() => window.location = "/mis-servicios"}>Mis servicios</MenuItem>
                  <MenuItem onClick={() => window.location = "/mis-citas"}>Mis citas</MenuItem>
                  
                </Menu>
              </Nav>
              
              <Nav>
                <Menu menuButton={<MenuButton>Administracion</MenuButton>}>
                  <SubMenu label="Usuarios">
                    <MenuItem onClick={() => window.location = "/usuarios"}>Lista</MenuItem>
                    <MenuItem onClick={() => window.location = "/crear-usuario"}>Nuevo</MenuItem>
                  </SubMenu>
                  <SubMenu label="Servicios">
                    <MenuItem onClick={() => window.location = "/servicios"}>Lista</MenuItem>
                    <MenuItem onClick={() => window.location = "/crear-servicio"}>Nuevo</MenuItem>
                  </SubMenu>
                  <SubMenu label="Citas">
                    <MenuItem onClick={() => window.location = "/citas"}>Lista</MenuItem>
                    <MenuItem onClick={() => window.location = "/crear-cita"}>Nuevo</MenuItem>
                  </SubMenu>
                </Menu>
              </Nav>
              <Nav>
                <button onClick={logout}>Cerrar sesion</button>
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
                <Route path="/agenda/:servicio" component={AgendaServicio} />
                <Route path="/agenda/" component={Agenda} />                
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;