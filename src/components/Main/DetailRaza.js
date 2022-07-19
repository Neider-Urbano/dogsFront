import React, {useEffect, useState} from 'react'
import "../../styles/Components/Main/DetailRaza.css"
import { getRaza } from '../../redux/actions'
import { connect } from 'react-redux/es/exports'
import { useParams } from 'react-router-dom'
import Loading from '../Menors/Loading'
import SinInternet from '../Menors/SinInternet'
import AlertDogs from '../Menors/AlertDogs'
import GrupoInformacionRaza from './DetailRaza/GrupoInformacionRaza'

const DetailRaza = ({raza, getRaza, exitoAndError}) => {
  const params=useParams();
  const {idRaza}=params;
  const [sinInternet,setSinInternet]=useState(null)
  const [alertaExit,setAlertaExit]=useState(null)

  useEffect(()=>{
    if(navigator.onLine){
      if(alertaExit===null){
        getRaza(idRaza);
        setTimeout(()=>{  
          if(exitoAndError[0] && exitoAndError[0].error){
            setAlertaExit(false)
          }
        },1000)}
        setSinInternet(false)
    }else{
      setSinInternet(true)
  }},[navigator.onLine, exitoAndError])

  function functionClickAlerta(valueClick){  // function --> AlertDogs = (Click)
    if(valueClick){setAlertaExit(true)}
  }

  return (
    <div className="divDetailRaza">
      {sinInternet!==true ? 
        <>
          {!raza[0] && alertaExit===null && <Loading />}
          {exitoAndError[0] && exitoAndError[0].error && alertaExit===false &&
            <AlertDogs tipoAlerta="error" mensajeAlerta={exitoAndError[0].error} 
              functionClickAlerta={functionClickAlerta} visibleVolver={false}/>}
          {raza[0] && exitoAndError[0].exito &&
            <div className="divIntegrandoRaza">
                <p className="tituloDetallesRaza">Detalles de raza</p>
                <div className="divInformacionDetalles">
                  <div className="divImgRazaDetail">
                    <img src={raza[0].image.url} alt=""/>
                  </div>
                  <div className="divInformacionRaza">  
                    <GrupoInformacionRaza tituloPDetalle="Nombre" pDetalles={raza[0].name}/>
                    <GrupoInformacionRaza tituloPDetalle="Temperamentos" pDetalles={raza[0].temperament}/>
                    <GrupoInformacionRaza tituloPDetalle="Altura Imperial" pDetalles={raza[0].height.imperial}/>
                    <GrupoInformacionRaza tituloPDetalle="Altura Metric" pDetalles={raza[0].height.metric}/>
                    <GrupoInformacionRaza tituloPDetalle="Peso Imperial" pDetalles={raza[0].weight.imperial}/>
                    <GrupoInformacionRaza tituloPDetalle="Peso Metric" pDetalles={raza[0].weight.metric}/>
                    <GrupoInformacionRaza tituloPDetalle="Años de Vida" pDetalles={raza[0].life_span}/>
                  </div> 
                </div> 
            </div>}
    </> : <SinInternet/>}
    </div>
  )
}

const mapStateToProps=(state)=>{
  return{
    raza:state.raza,
    exitoAndError: state.exitoAndError
  }
}
function mapDispatchToProps(dispatch){
  return{
    getRaza: async(idRaza)=>{await dispatch(getRaza(idRaza))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailRaza)