import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux' 
import {nanoid} from "nanoid"

import Pagination from './Razas/filtrarOrdenar/Pagination'
import SelectFiltrar from './Razas/filtrarOrdenar/SelectFiltrar'
import SelectOrdenar from './Razas/filtrarOrdenar/SelectOrdenar'
import TarjetaRaza from './Razas/TarjetaRaza'
import AlertDogs from '../Menors/AlertDogs'
import Loading from '../Menors/Loading'
import BusquedaNombreRaza from './Razas/BusquedaNombreRaza'
import SinInternet from '../Menors/SinInternet'

import "../../styles/Components/Main/Razas.css"
import {getRazas,getRazasName} from "../../redux/actions"
import { functionOrdenarRazas } from '../../utils/functionsRazas/funcionOrdenarRazas'
import { functionFiltrarRazas } from '../../utils/functionsRazas/functionFiltrarRazas'

const Razas = ({razas,getRazas, getRazasName, exitoAndError}) => {
  const [sinInternet,setSinInternet]=useState(null)            
  const [pagina,setPagina]=useState(1)
  const [porPagina,setPorPagina]=useState(8)
  const [maximo,setMaximo]=useState(0)
  const [razasRedux, setRazasRedux]=useState([])
  const [buscarNameRaza,setBuscarNameRaza]=useState("")               //para guardar el valor del input busqueda
  const [clickBuscarNameRaza,setClickBuscarNameRaza]=useState(null)   //para guardar el valor si se dio click al input busqueda
  const [alertaExit, setAlertaExit]=useState(null)                    //para guardar el valor de permanencia de un alertDos component

  useEffect(()=>{
    if(navigator.onLine){
      if(clickBuscarNameRaza==="filtrar"){
        setMaximo(razasRedux.length/porPagina) 
        setClickBuscarNameRaza(false)
      }else if(clickBuscarNameRaza!==false && clickBuscarNameRaza!=="alertInformation"){
        if(clickBuscarNameRaza===null){         
          getRazas();
        }else if(clickBuscarNameRaza===true){
          getRazasName(buscarNameRaza)
        }
        if(exitoAndError[0]){
          if(exitoAndError[0].exito){
            setTimeout(()=>{ setRazasRedux(razas)},800)
            setTimeout(()=>{ setMaximo(razas.length/porPagina)
              setClickBuscarNameRaza(false)
            },1000)
          }else{
            setTimeout(()=>{setAlertaExit(false)
              setClickBuscarNameRaza(false);
            },1000)
          }
        }else{setAlertaExit(false)}
      }else{
        setAlertaExit(false)
      }
      setSinInternet(false)
    }else{
      setSinInternet(true)
  }},[razas, clickBuscarNameRaza, navigator.onLine])

  const opcionOrdenarRazas=async(opcion)=>{
      functionOrdenarRazas(razasRedux,opcion,setRazasRedux) //Utils
  };const busquedaNombreRaza=(value)=>{
      if(value.length>2 || value===""){
        var clickBuscar=null;
        if(value!==""){clickBuscar=true}
        setClickBuscarNameRaza(clickBuscar)
        setBuscarNameRaza(value)
      }else{
        setClickBuscarNameRaza("alertInformation")
      }
  };const onChangeFiltros=(valueSelect, valueFiltro)=>{ 
      functionFiltrarRazas(valueSelect, valueFiltro,
        razas,setRazasRedux,setClickBuscarNameRaza  
      )                                                           //Utils
  };function functionClickAlerta(valueClick){ // function --> AlertDogs = (Click)
      if(valueClick){
        setAlertaExit(true)
        if(clickBuscarNameRaza==="alertInformation"){
          setClickBuscarNameRaza(true)
          setBuscarNameRaza("")
        } 
      }
  }

  return (
    <div className="divMainRazas">
      {sinInternet===true && <SinInternet />}
      {sinInternet===false && exitoAndError.length===0 && <Loading />} 
      {sinInternet===false && exitoAndError.length>0 && 
        exitoAndError[0].error && !razasRedux[0] && alertaExit===false &&
        <AlertDogs tipoAlerta="error" mensajeAlerta={exitoAndError[0].error} 
          functionClickAlerta={functionClickAlerta} visibleVolver={false}
        />}
      
      {sinInternet===false && exitoAndError.length>0 && razasRedux[0] &&
          <>
            <div className="divOpcionesFiltrarOrdenar">
              <SelectFiltrar razas={razas} onChangeFiltros={onChangeFiltros}/>
              <SelectOrdenar opcionOrdenarRazas={opcionOrdenarRazas}/>
              <BusquedaNombreRaza busquedaNombreRaza={busquedaNombreRaza}/>
            </div>
            <div className="divRazas">
              {clickBuscarNameRaza===false ? razasRedux
                    .slice((pagina-1)*porPagina, (pagina-1)*porPagina+porPagina)
                    .map((raza)=>{
                      return  <TarjetaRaza raza={raza} key={nanoid()}/>
              }): <Loading />}
            </div>
            <div className="divPagination">
              {razasRedux[0] && clickBuscarNameRaza===false &&
                <Pagination pagina={pagina} setPagina={setPagina} 
                          maximo={maximo} cantidadRazas={razasRedux.length}/>
              }  
            </div>
            {exitoAndError[0].error && alertaExit===false &&    
              <AlertDogs tipoAlerta="error" mensajeAlerta={exitoAndError[0].error} 
              functionClickAlerta={functionClickAlerta} visibleVolver={false}
            />}
            {clickBuscarNameRaza==="alertInformation" && alertaExit===false &&
              <AlertDogs tipoAlerta="information" mensajeAlerta="El valor ingresado debe contener mas de 2 caracteres" 
              functionClickAlerta={functionClickAlerta} visibleVolver={false}/>}
          </> 
      }   
    </div>
  )
}
const mapStateToProps=(state)=>{
  return{ razas:state.razas,
          exitoAndError:state.exitoAndError
  }
};function mapDispatchToProps(dispatch){
    return{ getRazas: async()=>{await dispatch(getRazas())},
            getRazasName: async(name)=>{await dispatch(getRazasName(name))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Razas)