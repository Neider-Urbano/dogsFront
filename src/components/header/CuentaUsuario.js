import React from 'react'
import {Link} from "react-router-dom"
import "../../styles/Components/Nav/CuentaUsuario.css"
import logoUser from "../../images/icons/user.png"

const CuentaUsuario = () => {
  const localUserName=window.localStorage;
  const nameUser=localUserName.getItem("nameUser");

  const clickCerrarSesion=()=>{
    localUserName.clear();
    window.location="/"
  }

  return (
    <div className="divCuentaUsuario">
        <div className="divOpcionesCuentaUser">
          <p className="pUserName">
            {nameUser!==null ? nameUser : "nombreUsuario"}
          </p>
          <Link to="/" className="LinkRouter"
            onClick={()=>{
              clickCerrarSesion()
            }}
          >
            <p className="pCerrarSesion">cerrar sesión</p>
          </Link>
        </div>
        <div className="divImgLogoUser">
          <img src={logoUser} alt=""/>
        </div>
    </div>
  )
}

export default CuentaUsuario