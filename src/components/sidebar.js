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
            <a id="home" className="menu-item" href="/">Inicio</a>
            <a id="home" className="menu-item" href="/citas">Citas</a>
            <a id="about" className="menu-item" href="/servicios">Servicios</a>
            <a id="contact" className="menu-item" href="/usuarios">Usuarios</a>
            <a id="settings" className="menu-item" href="/mecanicos">Mecanicos</a>
            <a id="settings" className="menu-item" href="/agenda">Agenda</a>
            <a id="settings" className="menu-item" onClick={logout}>Cerrar Sesion</a>
        </Menu>
   )
}