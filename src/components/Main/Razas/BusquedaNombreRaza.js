import React,{useState} from 'react'
import iconoLupaBuscar from "../../../images/icons/icons8-búsqueda-30.png"
import "../../../styles/Components/Main/BusquedaNombreRaza.css"

const BusquedaNombreRaza = ({busquedaNombreRaza}) => {
    const [valorBusqueda, setValorBusqueda]=useState("");
    return (
        <div className="divInputBusqueda">
            <input type="text" placeholder="Raza..." className="inputBuscarRaza"
                onChange={(e)=>{
                    setValorBusqueda(e.target.value)
                }}
                id="inputBuscarRaza" value={valorBusqueda}
            />
            <div>
                <img src={iconoLupaBuscar} alt="" onClick={()=>{
                    busquedaNombreRaza(valorBusqueda)
                    setValorBusqueda("")
                }}/>
            </div>
        </div>
    )
}

export default BusquedaNombreRaza