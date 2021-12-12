import React  from "react";
import { slide as Menu } from "react-burger-menu";

const logout = () => {
    localStorage.clear();
    // you can also like localStorage.removeItem('Token');
    window.location.href = "/";
  } 

export default function Sidebar() {
   return(
        <Menu>
            <a id="inicio" className="menu-item" href="/">Inicio</a>
            <a id="citas" className="menu-item" href="/citas">Citas</a>
            <a id="servicios" className="menu-item" href="/servicios">Servicios</a>
            <a id="usuarios" className="menu-item" href="/usuarios">Usuarios</a>
            <a id="mecanicos" className="menu-item" href="/mecanicos">Mecanicos</a>
            <a id="agenda" className="menu-item" href="/agenda">Agenda</a>
            <a id="cerrar" className="menu-item" onClick={logout}>Cerrar Sesion</a>
        </Menu>
   )
}