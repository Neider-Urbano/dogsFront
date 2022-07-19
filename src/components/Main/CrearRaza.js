import React, {useEffect, useState} from 'react'
import "../../styles/Components/Main/CrearRaza.css"
import iconoCrearRaza from "../../images/icons/crearRaza.png"
import { postRaza, getTemperamentos } from '../../redux/actions'
import { connect } from 'react-redux'
import { validarCamposCrearRaza } from '../../utils/functionsCrearRaza/validarCamposCrearRaza'
import { functionCreadoraObjetoRaza } from '../../utils/functionsCrearRaza/functionCreadoraObjetoRaza'
import FormularioCrearRaza from './crearRaza/FormularioCrearRaza'
import SinInternet from '../Menors/SinInternet'
import LoadingCrearRaza from '../Menors/LoadingCrearRaza'
import AlertDogs from '../Menors/AlertDogs'

const CrearRaza = ({getTemperamentos, temperaments, postRaza, exitoAndError}) => {
  var [temperamentosSelect,setTemperamentosSelect]=useState([]);
  const [errores,setErrores]=useState({})
  const [sinInternet,setSinInternet]=useState(null)
  const [clickCrearRaza,setClickCrearRaza]=useState(null)
  const [alertaExit,setAlertaExit]=useState(null)
  const botonInputCrear=document.querySelector(".inputCrearRaza");
  const [datosRaza, setDatosRaza]=useState({
    name:"", heightImperialMin:"", heightImperialMax:"", heightMetricMin:"", 
    heightMetricMax: "", weightImperialMin:"", weightImperialMax:"", weightMetricMin:"",
    weightMetricMax:"",   life_spanMin:"", life_spanMax:""
  })

  useEffect(()=>{
    if(navigator.onLine){
      if(alertaExit===null && !temperaments[0]){
        setTimeout(()=>{
            getTemperamentos();
        },500)  
        setTimeout(()=>{
          if(exitoAndError[0]){
            setAlertaExit(false)
          }
        },700)
      }
      if(clickCrearRaza){
        setAlertaExit(false)
      }
      setSinInternet(false)
    }else{
      setSinInternet(true)
    }
  },[navigator.onLine,exitoAndError])

  const onChangeDatosRaza=(e)=>{                                 //Funcion que se ejecuta cuando
    const {name, value}=e.target;                                //hay un cambio en los campos del form
    setDatosRaza(estados=>({
      ...estados, [name]:value
    }))
    if(name!=="life_spanMin"){
      setErrores(validarCamposCrearRaza(name,value, datosRaza))
    }else if(name==="life_spanMin" && value==""){
      datosRaza.life_spanMax="";
    }
  }
  const onChangeTemperamentos=(e)=>{                             //Funcion que se ejecuta cuando
    var {value}=e.target;                                        //hay un cambio en el select temperamento
    if(!temperamentosSelect.includes(value)){
      setTemperamentosSelect([...temperamentosSelect, value])
    }
  }
  const cancelarTemperamento=(temperamento)=>{                  //Funcion que se ejecuta cuando
    var filterTemp=temperamentosSelect.filter((temp)=>{         //le de click en el div de temperamentos
      if(temp!==temperamento){                                  //ya seleccionados
        return temp
      }
    })
    setTemperamentosSelect(filterTemp)
  }
  const onClickPostRaza=()=>{
    if(!sinInternet){
      const existeErrorAun=[];
      for (const index in datosRaza) {
        if(index!=="life_spanMin"){
          const error=validarCamposCrearRaza(index,datosRaza[index], datosRaza)
          if(Object.getOwnPropertyNames(error).length>0)existeErrorAun.push(error)
        }
      }
      if(existeErrorAun[0]){
        setErrores(existeErrorAun[0])
        var inputName=Object.keys(existeErrorAun[0])[0];
        document.getElementsByName(inputName)[0].focus();
      }else{
        botonInputCrear.disabled=true;
        botonInputCrear.style.cursor="not-allowed";
        var temperaments="";
        if(temperamentosSelect[0]){
          temperamentosSelect.map((temp)=>{
            temperaments+=temp+", ";
          })
        }
        setClickCrearRaza(true);
        postRaza(functionCreadoraObjetoRaza(datosRaza, temperaments))
        
      }
    }
  }

  function functionClickAlerta(valueClick){
    if(valueClick==="Ok" && datosRaza){
      setDatosRaza({
        name:"", heightImperialMin:"", heightImperialMax:"", heightMetricMin:"", 
        heightMetricMax: "", weightImperialMin:"", weightImperialMax:"", weightMetricMin:"",
        weightMetricMax:"",   life_spanMin:"", life_spanMax:""
      })
      setTemperamentosSelect([])
    }
    if(valueClick){
      setAlertaExit(true)
      setClickCrearRaza(false);
      botonInputCrear.disabled=false;
      botonInputCrear.style.cursor="pointer";
    }
  }
  return (
    <div className="divCrearRaza">
      {!sinInternet ? 
        <div className="divAgrupandoRaza">
          <p className="pTituloFormularioCrearRaza">Formulario de creación</p>
          <div className="formCrearRaza">
            <div className="divIconoCrearRaza">
              <img src={iconoCrearRaza} alt=""/>
              <div className="divInputCrear">
                <input type="button" value="Crear" className="inputCrearRaza" 
                  onClick={()=>{onClickPostRaza()}}/>
                {clickCrearRaza && <LoadingCrearRaza />}
              </div>
            </div>
            <FormularioCrearRaza 
              datosRaza={datosRaza}
              errores={errores}
              onChangeDatosRaza={onChangeDatosRaza}
              cancelarTemperamento={cancelarTemperamento}
              temperamentosSelect={temperamentosSelect}
              temperaments={temperaments}
              onChangeTemperamentos={onChangeTemperamentos}
            />
          </div> 
        </div>
      : <SinInternet />}
      {exitoAndError[0] && exitoAndError[0].error && alertaExit===false && 
        <AlertDogs tipoAlerta="error" mensajeAlerta={exitoAndError[0].error} 
        functionClickAlerta={functionClickAlerta} visibleVolver={true}/>}

      {exitoAndError[0] && exitoAndError[0].exito &&  
        clickCrearRaza && alertaExit===false && 
          <AlertDogs tipoAlerta="exito" mensajeAlerta={exitoAndError[0].exito} 
              functionClickAlerta={functionClickAlerta} visibleVolver={true}
          />}
    </div>)
}

const mapStateToProps=(state)=>{
  return{
    temperaments:state.temperaments,
    exitoAndError: state.exitoAndError
  }
}
function mapDispatchToProps(dispatch){
  return{
    getTemperamentos: async()=>{await dispatch(getTemperamentos())},
    postRaza: async(objectRaza)=>{await dispatch(postRaza(objectRaza))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearRaza)