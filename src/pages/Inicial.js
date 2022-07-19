import React, {useEffect, useState, Component} from 'react'
import "../styles/pages/Inicial.css";
import iconoPi from "../images/icons/iconoPi.png"

class Inicial extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputNameUser: "",
      errorNameUser: "",
    }
    this.localStore=window.localStorage;
    this.localStoreNameUser=this.localStore.getItem("nameUser")
  }
  onClickIngresar=()=>{
    if(this.state.errorNameUser===""){
      if(this.state.inputNameUser!==""){
        this.localStore.clear();
        this.localStore.setItem('nameUser', this.state.inputNameUser);
      }
      window.location="/dogs";
    } 
  }
  onChangeNameUser=(e)=>{
    const {value}=e.target;
    this.setState({
      inputNameUser:value,
      errorNameUser:this.validarUserName(value)
    })
  }
  validarUserName=(valueInput)=>{
    let error="";
    if(valueInput.length<10 && valueInput.length>1){
      error="Minimo 10 caracteres";
    }
    if(valueInput.length>15){
      error="Máximo 15 caracteres";
    }
    return error
  }
  render(){
    return(
      <div className="divInicial">
         <section className="sectionInformacionInicial">
             <div className="divCrearUserInicial">
               <div className="divIconoInicial">
                 <img src={iconoPi} alt="" className="iconoiInicial"/>
               </div>
             <div className="divFormularioInicial">
             { this.localStoreNameUser===null &&
                <> 
                 <h1 className="h1CrearUser">Create un nombre</h1>
                 <input type="text" placeholder='User name' 
                   className="inputUserName" value={this.state.inputNameUser} 
                   onChange={(e)=>{this.onChangeNameUser(e)}}
                 />
                 {this.state.errorNameUser!=="" && 
                   <p className="pErrorValidacion">{this.state.errorNameUser}</p>
                 }
               </>
             }
             <div className="divBotonIngresar">
                 <button className="botonIngresar" onClick={()=>{
                   this.onClickIngresar()}}>Ingresar</button>
               </div>
             </div>
           </div>
         </section>
     </div>
    )
  }
}

export default Inicial
